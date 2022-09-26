import instance from './instance';

export type TokenType = {
  isLogin: true;
  accessToken: string;
  refreshToken: string;
};

export type SessionType = {
  isLogin: false;
  session: string;
  email: string;
  username: string;
};

export type SingUpReqType = {
  gender: string;
  age: string;
  language: string;
  policyConfirmed: boolean;
  nation: string;
  interests: string[];
  email: string;
  displayName: string;
  session: string;
  referralCode?: string;
  device: string;
};

export type UserProfileType = {
  email: string;
  username: string;
  gender: string;
  age: string;
  language: string;
  walletAddress: string;
  nation: string;
  interests: string[];
};

export type SignUpResType = TokenType & UserProfileType;

export type SignInResType = SessionType | TokenType;

const loginByGoogle = async (idToken: string) =>
  await instance.get<SessionType>(`auth/login/google/${idToken}`);

const signUp = async (body: SingUpReqType) =>
  await instance.post<SignUpResType>('user/mobile/sign-up', body);

const refresh = async () => await instance.get('auth/refresh');
export default {loginByGoogle, signUp, refresh};
