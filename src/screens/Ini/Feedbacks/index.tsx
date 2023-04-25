import {View} from 'react-native';
import React from 'react';
import {Feedback} from '../../../components';
import {FeedbackType} from '../../../api/feedback';

type Props = {
  initiativeToken: string;
  feedbackList: FeedbackType[];
};
const Feedbacks = ({initiativeToken, feedbackList}: Props) => {
  return (
    <>
      {feedbackList.map(feedback => (
        <Feedback
          key={`ini_${initiativeToken}_feedback${feedback.feedbackId}`}
          {...feedback}
        />
      ))}
    </>
  );
};

export default Feedbacks;
