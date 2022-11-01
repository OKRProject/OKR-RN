import axios from 'axios';
import {useCallback, useEffect, useMemo, useState} from 'react';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../api';
import {TokenType} from '../../api/auth';
import instance from '../../api/instance';
import userStore from '../../store/userStore';
import useSignOut, {clearUserSession} from '../useSignOut';

const refreshURI = `${Config.API_URL}auth/refresh`;

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
      const {data} = await api.user.getUserProfile();
      setUserProfile(data);
    }
    setIsInitReq(true);
  }, []);

  useEffect(() => {
    instance.interceptors.request.use(async config => {
      const session = await getUserSession();
      if (config.headers && session) {
        const isRefresh =
          config.url === 'user/sign-out' ||
          config.url === ' auth/refresh' ||
          config.url === refreshURI;

        config.headers.Authorization = `Bearer ${
          session[isRefresh ? 'refresh' : 'access']
        }`;
      }
      return config;
    });
  }, []);

  useEffect(() => {
    initReq();
    instance.interceptors.response.use(
      response => response,
      async error => {
        console.log(error.config.url, 'url');
        if (error?.response?.status === 401) {
          if (
            error?.config?.url === 'auth/refresh' ||
            error?.config?.url === refreshURI
          )
            signOutUser();
          else if (error?.config?.url !== 'user/sign-out') {
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
        }
        //todo api error가 500일떼
        return Promise.reject(error);
      },
    );

    setIsInitRes(true);
  }, [initReq, signOutUser, getUserSession]);

  return isLoading;
};

export default useAxiosInterceptor;
