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

const getCategory = async () =>
  await instance.get<FieldListType>('v1/user/job/category');

const getFields = async (category: string) =>
  await instance.get<FieldListType>(`v1/user/job/${category}/fields`);

const getUserProfile = async () =>
  await instance.get<UserProfileType>(`v1/user`);

export default {getCategory, getFields, getUserProfile};
