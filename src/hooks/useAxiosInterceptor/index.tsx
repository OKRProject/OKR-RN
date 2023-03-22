import axios from 'axios';
import {useCallback, useEffect, useMemo, useState} from 'react';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../api';
import instance from '../../api/instance';
import {TokenType} from '../../api/user';
import userStore from '../../store/userStore';
import useSignOut, {clearUserSession} from '../useSignOut';

const refreshURI = `${Config.API_URL}v1/user/refresh`;

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
  const beforeSession = await getUserSession();
  if (beforeSession) await clearUserSession();
  console.log('saveSessions');
  try {
    const session: SessionType = {
      access: tokens.accessToken,
      refresh: tokens.refreshToken,
    };
    await EncryptedStorage.setItem('user_session', JSON.stringify(session));
  } catch (error) {
    console.log(error, 'save session error');
  }
};

const useAxiosInterceptor = () => {
  const [isInitReq, setIsInitReq] = useState(false);
  const [isInitRes, setIsInitRes] = useState(false);
  const {signOutUser} = useSignOut();
  const {setUserProfile} = userStore();

  const isLoading = useMemo(
    () => !(isInitReq && isInitRes),
    [isInitReq, isInitRes],
  );

  const initReq = useCallback(async () => {
    const session = await getUserSession();

    if (session) {
      try {
        const {data} = await api.user.getUserProfile();
        setIsInitReq(true);

        setUserProfile(data);
      } catch (e) {
        setIsInitReq(true);

        console.log(e, 'login failed');
      }
    } else setIsInitReq(true);
  }, []);

  useEffect(() => {
    instance.interceptors.request.use(async config => {
      const session = await getUserSession();
      if (config.headers && session) {
        const isRefresh =
          config.url?.includes('user/sign-out') ||
          config.url?.includes('user/refresh') ||
          config.url?.includes(refreshURI);

        config.headers.Authorization = `Bearer ${
          session[isRefresh ? 'refresh' : 'access']
        }`;
      }
      return config;
    });
  }, []);

  useEffect(() => {
    initReq();
  }, []);

  useEffect(() => {
    instance.interceptors.response.use(
      response => response,
      async error => {
        console.log(error.config.url, 'url');
        if (error?.response?.status === 401) {
          if (
            error?.config?.url.includes('user/refresh') ||
            error?.config?.url.includes(refreshURI)
          )
            signOutUser();
          else if (!error?.config?.url.includes('user/sign-out')) {
            const session = await getUserSession();
            if (session) {
              const _config = {
                headers: {Authorization: `Bearer ${session.refresh}`},
              };

              const {status, data} = await axios.get(refreshURI, _config);

              if (status === 200) {
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
          // clearUserSession();
        }
        setIsInitRes(true);
        return Promise.reject(error);
      },
    );

    setIsInitRes(true);
  }, [initReq, signOutUser, getUserSession]);

  return isLoading;
};

export default useAxiosInterceptor;
