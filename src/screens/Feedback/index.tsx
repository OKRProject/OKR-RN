import {Image, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DefaultText as Text,
  Feedback as FeedbackItem,
  RoundSquareButton,
} from '../../components';
import {css} from '@emotion/native';
import api from '../../api';
import {FeedbackType} from '../../api/feedback';
import useGetFeedbackRequired from '../../query/feedback/useGetFeedbackRequired';
import userStore from '../../store/userStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';
interface Props
  extends NativeStackScreenProps<RootStackParamList, 'Feedback'> {}
const Feedback = ({navigation}: Props) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);
  const {data: requiredFeedbacks} = useGetFeedbackRequired();
  const {user} = userStore();

  const getFeedbackList = async () => {
    const {data} = await api.feedback.getMyFeedbackList();
    setFeedbackList(data.content);
  };
  useEffect(() => {
    getFeedbackList();
  }, []);

  return (
    <View
      style={[
        css`
          flex: 1;
          background-color: #181818;
          padding-top: 47px;
        `,
        requiredFeedbacks &&
          requiredFeedbacks.data.length > 0 &&
          css`
            background-color: #202227;
          `,
      ]}>
      <View
        style={css`
          padding: 12px 24px;
        `}>
        <Text
          style={css`
            font-weight: 700;
            font-size: 28px;
            line-height: 34px;
          `}>
          피드백
        </Text>
      </View>
      {requiredFeedbacks && requiredFeedbacks.data.length > 0 && (
        <View
          style={css`
            background-color: #202227;
            justify-content: center;
            align-items: center;
            padding: 24px;
          `}>
          <Image
            source={require('../../img/icn-feedback-require.png')}
            style={{width: 61, height: 60}}
          />
          <Text
            style={css`
              font-weight: 500;
              font-size: 24px;
              line-height: 29px;
              margin: 24px 0 12px;
            `}>
            대기 중인 피드백 {requiredFeedbacks.data.length}개
          </Text>
          <Text
            style={css`
              font-weight: 400;
              font-size: 14px;
              line-height: 17px;
              color: #616166;
            `}>
            {user?.name}님의 작성을 기다리고 있어요
          </Text>
          <RoundSquareButton
            onPress={() => navigation.navigate('RequireFeedback')}
            type="primary"
            size="s"
            style={css`
              width: 180px;
              margin-top: 24px;
            `}>
            피드백 작성하러 가기
          </RoundSquareButton>
        </View>
      )}

      <View
        style={css`
          flex: 1;
          background-color: #181818;
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
    </View>
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
  padding: 0px 24px;
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
