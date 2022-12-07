import {View, Image} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  Header,
  DefaultText as Text,
  RoundInput,
  RoundSquareButton,
} from '../../../components';
import {ProjectIniType} from '../../../api/project';
import {css} from '@emotion/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FeedbackEnum} from '../../../api/feedback';
import api from '../../../api';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/main';

const feedbackIcons = [
  {
    icon: require('../../../img/icn-idea.png'),
    text: '아이디어 굿!',
    feedbackGrade: FeedbackEnum.GOOD_IDEA,
  },
  {
    icon: require('../../../img/icn-best.png'),
    text: '최고의 결과',
    feedbackGrade: FeedbackEnum.BEST_RESULT,
  },
  {
    icon: require('../../../img/icn-burning.png'),
    text: '불타는 열정',
    feedbackGrade: FeedbackEnum.BURNING_PASSION,
  },
  {
    icon: require('../../../img/icn-communication.png'),
    text: '소통왕',
    feedbackGrade: FeedbackEnum.COMMUNI_KING,
  },
];

type Props = ProjectIniType;

const WriteFeedback = (data: Props) => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {user, iniDetail, projectId, iniSeq} = useMemo(() => data, [data]);
  const [{grade, opinion}, setFeedback] = useState<{
    grade?: FeedbackEnum;
    opinion: string;
  }>({opinion: ''});

  const handleClose = () => navigate('Ini', {type: 'detail', data});

  const handleClickIcon = (grade: FeedbackEnum) =>
    setFeedback(prev => ({...prev, grade}));

  const handleChangeInput = (opinion: string) =>
    setFeedback(prev => ({...prev, opinion}));

  const handleConfirm = async () => {
    if (grade && opinion) {
      try {
        await api.feedback.addFeedback({
          grade,
          opinion,
          projectId,
          initiativeId: iniSeq,
        });
        handleClose();
      } catch (e) {
        //todo error
      }
    }
  };

  return (
    <View style={background}>
      <View>
        <Header title="피드백 작성하기" onBack={handleClose} />
        <View style={infoWrap}>
          <View style={flex}>
            <View style={userProfile}>
              {user.profileImageUrl && (
                <Image
                  source={{uri: user.profileImageUrl}}
                  style={{width: '100%', height: '100%'}}
                />
              )}
            </View>
            <Text style={userName}>{user.userName}</Text>
          </View>
          <Text style={desc}>{iniDetail}</Text>
        </View>
      </View>
      <View style={container}>
        <View style={iconsWrap}>
          {feedbackIcons.map(({icon, text, feedbackGrade}) => (
            <TouchableOpacity onPress={() => handleClickIcon(feedbackGrade)}>
              <View
                key={`feedback_${feedbackGrade}`}
                style={[iconButton, feedbackGrade === grade && {opacity: 1}]}>
                <Image
                  style={{height: 38, width: 38}}
                  resizeMode="contain"
                  source={icon}
                />
                <Text>{text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <RoundInput
          multiline
          value={opinion}
          style={feedbackInput}
          onChangeText={handleChangeInput}
        />
        <RoundSquareButton
          type={opinion.length === 0 ? 'secondary' : 'primary'}
          size="m"
          disabled={opinion.length === 0}
          onPress={handleConfirm}>
          작성 완료
        </RoundSquareButton>
      </View>
    </View>
  );
};
const background = css`
  width: 100%;
  flex: 1;
  background-color: #18181b;
  padding-top: 40px;
  justify-content: space-between;
`;

const infoWrap = css`
  padding: 24px;
  margin-bottom: 20px;
  margin-top: 8px;
`;

const flex = css`
  flex-direction: row;
  align-items: center;
`;

const userProfile = css`
  width: 24px;
  height: 24px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #999;
  margin-right: 8px;
`;

const userName = css`
  color: #a9a9a9;
  font-size: 16px;
`;

const desc = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  margin: 18px 0;
  color: #fff;
`;

const feedbackInput = css`
  height: 265px;
  margin: 24px 0;
  padding: 14px;
`;
const container = css`
  background-color: #1e1e22;
  border-radius: 24px 24px 0 0;
  flex: 1;
  max-height: 593px;
  padding: 24px 32px;
`;

const iconsWrap = css`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 5px 0 10px;
`;

const iconButton = css`
  width: 72px;
  justify-content: center;
  align-items: center;
  opacity: 0.2;
`;
export default WriteFeedback;
