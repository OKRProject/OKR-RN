import instance from './instance';

export type UserProfileType = {
  email: string;
  name: string;
  field: string;
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
  id: number;
  notiType: NotificationEnum;
  msg: string;
  checked: boolean;
};
const getCategory = () => instance.get<FieldListType>('v1/user/job/category');

const getFields = (category: string) =>
  instance.get<FieldListType>(`v1/user/job/${category}/fields`);

const getUserProfile = () => instance.get<UserProfileType>(`v1/user`);

const getNotificationList = () => instance.get(`v1/user/notification`);

const confirmNotification = (id: number) =>
  instance.put(`v1/user/notification/${id}`);

export default {
  getCategory,
  getFields,
  getUserProfile,
  getNotificationList,
  confirmNotification,
};
