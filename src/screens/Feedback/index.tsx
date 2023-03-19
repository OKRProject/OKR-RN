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
      <View
        style={css`
          flex: 1;
        `}>
        <View style={_header}>
          <Text style={_title}>받은 피드백</Text>
          <View style={_filter}>
            <Text>최근 1주일</Text>
          </View>
        </View>
        {feedbackList.length > 0 ? (
          <>
            <ScrollView style={_contentWrap}>
              {feedbackList.map(feedback => (
                <FeedbackItem
                  key={`feedback${feedback.feedbackId}`}
                  {...feedback}
                />
              ))}
            </ScrollView>
          </>
        ) : (
          <View
            style={css`
              flex: 1;
            `}>
            <View style={_emptyWrap}>
              <Image
                source={require('../../img/feedback.png')}
                resizeMode="contain"
                style={{width: 125}}
              />
              <Text style={_emptyTitle}>아직 받은 피드백이 없어요.</Text>
              <Text style={_emptyDesc}>
                행동전략을 완료하고 피드백을 받아보세요.
              </Text>
            </View>
          </View>
        )}
      </View>
    </Background>
  );
};

export default Feedback;
const _header = css`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
`;
const _title = css`
  font-weight: 600;
  font-size: 20px;
  line-height: 33px;
`;
const _filter = css`
  background: #27272a;
  border-radius: 6px;
  padding: 12px 16px;
  align-self: flex-end;
`;
const _contentWrap = css`
  flex: 1;
  width: 100%;
`;
const _emptyWrap = css`
  width: 100%;
  align-items: center;
  margin: auto 0;
  padding-bottom: 150px;
`;

const _emptyTitle = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;
const _emptyDesc = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: #a9a9a9;
`;
