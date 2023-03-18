import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaultText as Text, Feedback} from '../../../components';
import {css} from '@emotion/native';
import {FeedbackEnum, FeedbackType} from '../../../api/feedback';
import api from '../../../api';

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

const container = css``;
const title = css`
  margin: 40px 16px 16px;
  font-weight: 600;
  font-size: 20px;
`;

export default Feedbacks;
