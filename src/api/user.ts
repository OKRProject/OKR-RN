import instance from './instance';

type userAuthType = {
  email: string;
  name: string;
  providerType: 'GOOGLE';
  profileImage: string;
};

export type TokenType = userAuthType & {
  accessToken: string;
  refreshToken: string;
};

export type SessionType = userAuthType & {
  tempUserId: string;
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
  await instance.get<SessionType>(`auth/login/GOOGLE/${idToken}`);

const signUp = async (body: SingUpReqType) =>
  await instance.post<SignUpResType>('user/mobile/sign-up', body);

const refresh = async () => await instance.get('auth/refresh');
export default {loginByGoogle, signUp, refresh};
