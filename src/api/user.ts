import instance from './instance';

export type UserProfileType = {
  email: string;
  name: string;
  field: string;
  profileImage: string;
};

export type TokenType = UserProfileType & {
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

export type FieldListType = {
  code: string;
  title: string;
}[];

const getCategory = async () =>
  await instance.get<FieldListType>('user/job/category');

const getFields = async (category: string) =>
  await instance.get<FieldListType>(`user/job/${category}/fields`);

export type SignUpResType = TokenType & UserProfileType;

export type SignInResType = SessionType | TokenType;

const loginByGoogle = async (idToken: string) =>
  await instance.get<SignInResType>(`auth/login/GOOGLE/${idToken}`);

const signUp = async (body: SingUpReqType) =>
  await instance.post<SignUpResType>('user/mobile/sign-up', body);

const refresh = async () => await instance.get('auth/refresh');
export default {loginByGoogle, signUp, refresh, getCategory, getFields};
