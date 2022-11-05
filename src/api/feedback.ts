import instance from './instance';
export enum FeedbackEnum {
  'GOOD_IDEA' = 'GOOD_IDEA',
  'BEST_RESULT' = 'BEST_RESULT',
  'BURNING_PASSION' = 'BURNING_PASSION',
  'COMMUNI_KING' = 'COMMUNI_KING',
}
export type FeedbackType = {
  feedbackId: number;
  text: string;
  grade: FeedbackEnum;
  writerId: number;
  writerName: string;
  writerJob: string;
  profileImage: string;
};
