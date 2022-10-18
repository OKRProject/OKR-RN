import axios from 'axios';
import {useCallback, useEffect, useMemo, useState} from 'react';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import instance from '../../api/instance';
import {TokenType} from '../../api/user';

import useSignOut from '../useSignOut';

type SessionType = {access: string; refresh: string};

const getUserSession = async () => {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    if (session) {
      const parsed: SessionType = JSON.parse(session);
      return parsed;
    }
  } catch (error) {}
};

export const saveSessions = async (tokens: TokenType) => {
  console.log('saveSessions');
  try {
    const session: SessionType = {
      access: tokens.accessToken,
      refresh: tokens.refreshToken,
    };
    await EncryptedStorage.setItem('user_session', JSON.stringify(session));
  } catch (error) {}
};

const useAxiosInterceptor = () => {
  const [isInitReq, setIsInitReq] = useState(false);
  const [isInitRes, setIsInitRes] = useState(false);
  const {signOutUser} = useSignOut();

  const isLoading = useMemo(
    () => !(isInitReq && isInitRes),
    [isInitReq, isInitRes],
  );

  const initReq = useCallback(async () => {
    const session = await getUserSession();
    setIsInitReq(true);
  }, []);

  useEffect(() => {
    instance.interceptors.request.use(async config => {
      const session = await getUserSession();
      if (config.headers && session) {
        const isRefresh =
          config.url === 'user/sign-out' || config.url === ' user/refresh';
        config.headers.Authorization = `Bearer ${
          session[isRefresh ? 'refresh' : 'access']
        }`;
      }
      return config;
    });
  }, []);

  useEffect(() => {
    const refreshURI = `${Config.API_URL}/user/mobile/refresh`;

    initReq();
    instance.interceptors.response.use(
      response => response,
      async error => {
        if (error?.response?.status === 401) {
          const session = await getUserSession();

          if (error?.config?.url === 'user/mobile/refresh') signOutUser();
          else if (error?.config?.url !== 'user/sign-out') {
            if (session) {
              const _config = {
                headers: {Authorization: `Bearer ${session.refresh}`},
              };
              const {status, data} = await axios.post(refreshURI, _config);

              if (status === 201) {
                saveSessions(data);
                const config = {
                  ...error.config,
                  headers: {
                    ...error.config.headers,
                    Authorization: `Bearer ${data.accessToken}`,
                  },
                };
                return axios.request(config);
              }
            }
          } else signOutUser(true);
        }
        return Promise.reject(error);
      },
    );

    setIsInitRes(true);
  }, [initReq, signOutUser]);

  return isLoading;
};

export default useAxiosInterceptor;
