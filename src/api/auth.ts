import instance from './instance';
import {UserProfileType} from './user';

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export type SessionType = {
  tempUserId: string;
  email: string;
  name: string;
  profileImage: string;
};

export type SingUpReqType = {
  tempUserId: string;
  email: string;
  name: string;
  jobField: string;
};

export type SignUpResType = TokenType & UserProfileType;
export type SignInSuccessResType = TokenType & UserProfileType;

export type SignInResType = SessionType | SignInSuccessResType;

const loginByGoogle = async (idToken: string) =>
  await instance.get<SignInResType>(`user/login/GOOGLE/${idToken}`);

const loginByApple = async (idToken: string) =>
  await instance.get<SignInResType>(`user/login/APPLE/${idToken}`);

const signUp = async (body: SingUpReqType) =>
  await instance.post<SignUpResType>('user/join', body);

const refresh = async () => await instance.get('auth/refresh');

export default {loginByGoogle, signUp, refresh, loginByApple};
