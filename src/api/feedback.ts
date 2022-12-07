import instance from './instance';
export enum FeedbackEnum {
  'GOOD_IDEA' = 'GOOD_IDEA',
  'BEST_RESULT' = 'BEST_RESULT',
  'BURNING_PASSION' = 'BURNING_PASSION',
  'COMMUNI_KING' = 'COMMUNI_KING',
}

export type FeedbackType = {
  feedbackId: number;
  opinion: string;
  grade: FeedbackEnum;
  writerId: number;
  writerName: string;
  writerJob: string;
  profileImage: string;
};

type AddFeedbackReqType = {
  opinion: string;
  grade: FeedbackEnum;
  projectId: number;
  initiativeId: number;
};

export type GetIniFeedbackInfoResType = {
  myInitiative: true;
  wroteFeedback: false;
  feedback: FeedbackType[];
};

export type GetMyFeedbacksResType = {
  content: FeedbackType[];
};

const addFeedback = (body: AddFeedbackReqType) =>
  instance.post(`v1/feedback`, body);

const getIniFeedbacks = (iniId: number) =>
  instance.get<GetIniFeedbackInfoResType>(`v1/feedback/${iniId}`);

const getMyFeedbackList = () =>
  instance.get<GetMyFeedbacksResType>(`v1/feedback?page=0&size=10`);
export default {addFeedback, getIniFeedbacks, getMyFeedbackList};
