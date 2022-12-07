import {Image, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Background,
  Header,
  DefaultText as Text,
  Feedback as FeedbackItem,
} from '../../components';
import {css} from '@emotion/native';
import api from '../../api';
import {FeedbackType} from '../../api/feedback';

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);

  const getFeedbackList = async () => {
    const {data} = await api.feedback.getMyFeedbackList();
    setFeedbackList(data.content);
  };
  useEffect(() => {
    getFeedbackList();
  }, []);

  return (
    <Background>
      <Header title="피드백" />
      <View style={filter}>
        <Text>최근 1주일</Text>
      </View>
      <ScrollView style={contentWrap}>
        {feedbackList.length > 0 ? (
          <>
            {feedbackList.map(feedback => (
              <FeedbackItem
                key={`feedback${feedback.feedbackId}`}
                {...feedback}
              />
            ))}
          </>
        ) : (
          <View style={emptyWrap}>
            <Image
              source={require('../../img/feedback.png')}
              resizeMode="contain"
              style={{width: 125}}
            />
            <Text style={desc}>아직 받은 피드백이 없어요.</Text>
            <Text style={desc}>이니셔티브를 완료하고 피드백을 받아볼까요?</Text>
          </View>
        )}
      </ScrollView>
    </Background>
  );
};

export default Feedback;

const filter = css`
  background: #27272a;
  border-radius: 6px;
  padding: 12px 16px;
  align-self: flex-end;
  margin-right: 16px;
`;
const contentWrap = css`
  flex: 1;
  width: 100%;
`;
const emptyWrap = css`
  width: 100%;
  align-items: center;
  margin: auto 0;
  padding-bottom: 150px;
`;

const desc = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #a9a9a9;
`;
