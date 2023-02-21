import instance from './instance';

export type UserProfileType = {
  email: string;
  name: string;
  jobFieldDetail: string;
  profileImage: string;
};

export type FieldListType = {
  code: string;
  title: string;
}[];

export enum NotificationEnum {
  NEW_TEAM_MATE = 'NEW_TEAM_MATE',
  INITIATIVE_ACHIEVED = 'INITIATIVE_ACHIEVED',
  PROJECT_PROGRESS_ACHIEVED_QUARTER = 'PROJECT_PROGRESS_ACHIEVED_QUARTER',
  PROJECT_PROGRESS_ACHIEVED_HALF = 'PROJECT_PROGRESS_ACHIEVED_HALF',
  PROJECT_PROGRESS_ACHIEVED_THREE_QUARTERS = 'PROJECT_PROGRESS_ACHIEVED_THREE_QUARTERS',
  PROJECT_FINISHED = 'PROJECT_FINISHED',
  NEW_FEEDBACK = 'NEW_FEEDBACK',
}
export type NotificationType = {
  notiToekn: string;
  notiType: NotificationEnum;
  msg: string;
  status: 'NEW' | 'CHECKED';
};

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export type SessionType = {
  guestUserId: string;
  email: string;
  name: string;
  profileImage: string;
};

export type SingUpReqType = {
  guestUserId: string;
  email: string;
  name: string;
  jobField: string;
};

export type SignUpResType = TokenType & UserProfileType;
export type SignInSuccessResType = TokenType & UserProfileType;

export type SignInResType = SessionType | SignInSuccessResType;
const refresh = () => instance.get('user/refresh');

const getCategory = () => instance.get<FieldListType>('v1/user/job/category');

const getFields = (category: string) =>
  instance.get<FieldListType>(`v1/user/job/${category}/fields`);

const getUserProfile = () => instance.get<UserProfileType>(`v1/user`);

const getNotificationList = () =>
  instance.get<NotificationType[]>(`v1/notification`);

const confirmNotification = (id: string) =>
  instance.put(`v1/notification/${id}`);

const deleteNotification = (id: string) =>
  instance.delete(`v1/notification/${id}`);

const loginByGoogle = (idToken: string) =>
  instance.post<SignInResType>(`v1/user/login/GOOGLE/${idToken}`);

const loginByApple = (idToken: string) =>
  instance.post<SignInResType>(`v1/user/login/APPLE/${idToken}`);

const signUp = (body: SingUpReqType) =>
  instance.post<SignUpResType>('v1/user/join', body);

const updateUserInfo = (
  body: Partial<{
    userName: string;
    profileImage: string;
    jobField: string;
  }>,
) => instance.put('v1/user', body);
export default {
  getCategory,
  getFields,
  getUserProfile,
  getNotificationList,
  confirmNotification,
  deleteNotification,
  loginByGoogle,
  loginByApple,
  signUp,
  refresh,
  updateUserInfo,
};
