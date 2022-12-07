import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaultText as Text, Feedback} from '../../../components';
import {css} from '@emotion/native';
import {FeedbackEnum, FeedbackType} from '../../../api/feedback';
import api from '../../../api';
type Props = {
  iniId: number;
  feedbackList: FeedbackType[];
};
const Feedbacks = ({iniId, feedbackList}: Props) => {
  return (
    <View>
      {feedbackList.length > 0 && (
        <>
          <Text style={title}>팀원들의 피드백 ({feedbackList.length})</Text>
          {feedbackList.map(feedback => (
            <Feedback
              key={`ini_${iniId}_feedback${feedback.feedbackId}`}
              {...feedback}
            />
          ))}
        </>
      )}
    </View>
  );
};

const container = css``;
const title = css`
  margin: 40px 16px 16px;
  font-weight: 600;
  font-size: 20px;
`;
export default Feedbacks;
