import {View, Image, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {Header, DefaultText as Text} from '../../components';
import {css} from '@emotion/native';
import {FeedbackEnum} from '../../api/feedback';
import {RootStackParamList} from '../../navigation/main';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import query from '../../query';
import Step1 from './step1';
import Step2 from './step2';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'WriteFeedback'> {}

const WriteFeedback = ({route, navigation}: Props) => {
  const {keyResultToken, initiativeToken} = route.params;
  const {mutateAsync} = query.feedback.useWriteFeedback({initiativeToken});
  const [step, setStep] = useState<1 | 2>(1);
  const [{grade, opinion}, setFeedback] = useState<{
    grade?: FeedbackEnum;
    opinion: string;
  }>({opinion: ''});

  const handleClose = () =>
    keyResultToken
      ? navigation.navigate('Ini', {initiativeToken})
      : navigation.goBack();

  const handleClickIcon = (grade: FeedbackEnum) =>
    setFeedback(prev => ({...prev, grade}));

  const handleChangeInput = (opinion: string) =>
    setFeedback(prev => ({...prev, opinion}));

  const handleConfirm = async () => {
    if (grade && opinion) {
      try {
        await mutateAsync({
          grade,
          opinion,
          initiativeToken,
        });
        handleClose();
      } catch (e) {
        //todo error
      }
    }
  };
  const {data: initiative} = query.project.useGetIniInfo({
    initiativeToken,
  });

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={_background}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={css`
            flex: 1;
          `}>
          <Header title="피드백 작성하기" onBack={handleClose} />
          <View style={_infoWrap}>
            <View style={_flex}>
              <View style={_userProfile}>
                {initiative?.data.user.profileImage && (
                  <Image
                    source={{uri: initiative?.data.user.profileImage}}
                    style={{width: '100%', height: '100%'}}
                  />
                )}
              </View>
              <Text style={_userName}>{initiative?.data.user.userName}</Text>
            </View>
            <Text style={_title}>{initiative?.data.initiativeName}</Text>
            <Text style={_desc}>{initiative?.data.initiativeDetail}</Text>
          </View>
          {step === 1 ? (
            <Step1
              selectedIcon={grade}
              onSelect={handleClickIcon}
              onNext={() => setStep(2)}
            />
          ) : (
            <Step2
              opinion={opinion}
              onChange={handleChangeInput}
              onComplete={handleConfirm}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const _background = css`
  width: 100%;
  flex: 1;
  background-color: #181818;
`;

const _infoWrap = css`
  padding: 8px 24px;
  margin-bottom: 22px;
`;

const _flex = css`
  flex-direction: row;
  align-items: center;
`;

const _userProfile = css`
  width: 24px;
  height: 24px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #999;
  margin-right: 8px;
`;

const _userName = css`
  color: #a9a9a9;
  font-size: 16px;
`;

const _title = css`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin: 10px 0;
`;
const _desc = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
`;

export default WriteFeedback;
