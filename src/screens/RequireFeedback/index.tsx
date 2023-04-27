import {Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  Background,
  DefaultText as Text,
  Header,
  RoundSquareButton,
} from '../../components';
import useGetFeedbackRequired from '../../query/feedback/useGetFeedbackRequired';
import {RootStackParamList} from '../../navigation/main';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {css} from '@emotion/native';
import {ScrollView} from 'react-native-gesture-handler';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'RequireFeedback'> {}
const RequireFeedback = ({navigation}: Props) => {
  const {data: requiredFeedbacks} = useGetFeedbackRequired();

  useEffect(() => {
    if (requiredFeedbacks && requiredFeedbacks.data.length === 0)
      navigation.navigate('Feedback');
  }, [requiredFeedbacks]);

  return (
    <Background>
      <Header title="대기 중인 피드백" onBack={navigation.goBack} />
      <ScrollView
        style={css`
          flex: 1;
          padding: 0 24px;
          padding-top: 24px;
        `}>
        {requiredFeedbacks &&
          requiredFeedbacks.data?.map(ini => (
            <View
              key={`required_feedback_ini_${ini.initiativeToken}`}
              style={_container}>
              <Text style={_iniTitle}>{ini.initiativeName}</Text>
              <View style={_userInfo}>
                <View style={_imgWrap}>
                  {ini.user.profileImage && (
                    <Image
                      source={{uri: ini.user.profileImage}}
                      style={{width: '100%', height: '100%'}}
                    />
                  )}
                </View>
                <Text>
                  {ini.user.userName} ({ini.user.jobField})
                </Text>
              </View>
              <RoundSquareButton
                type="primary"
                size="xs"
                style={_button}
                onPress={() =>
                  navigation.navigate('WriteFeedback', {
                    initiativeToken: ini.initiativeToken,
                  })
                }>
                피드백 작성하기
              </RoundSquareButton>
            </View>
          ))}
      </ScrollView>
    </Background>
  );
};
const _container = css`
  width: 100%;
  background-color: #202227;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 8px;
`;

const _iniTitle = css`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;
const _userInfo = css`
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
`;
const _imgWrap = css`
  width: 24px;
  height: 24px;
  border: 1px solid #57575a;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 8px;
`;

const _button = css`
  margin-left: auto;
  padding: 8px 0px;
  width: 124px;
  border-radius: 8px;
`;
export default RequireFeedback;
