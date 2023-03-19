import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {RoundSquareButton, DefaultText as Text} from '../../../components';
import {FeedbackEnum} from '../../../api/feedback';
import {css} from '@emotion/native';

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

type Props = {
  selectedIcon?: FeedbackEnum;
  onSelect: (grade: FeedbackEnum) => void;
  onNext: () => void;
};
const Step1 = ({selectedIcon, onSelect, onNext}: Props) => {
  return (
    <View style={_container}>
      <View>
        <Text style={_title}>고생한 동료에게</Text>
        <Text style={_title}>칭찬 아이콘을 전해주세요!</Text>
        <View style={iconsWrap}>
          {feedbackIcons.map(({icon, text, feedbackGrade}) => (
            <TouchableOpacity
              key={`feedback_${feedbackGrade}`}
              onPress={() => onSelect(feedbackGrade)}>
              <View
                style={[
                  iconButton,
                  feedbackGrade === selectedIcon && {opacity: 1},
                ]}>
                <Image
                  style={{height: 50, width: 50}}
                  resizeMode="contain"
                  source={icon}
                />
                <Text style={_iconText}>{text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <RoundSquareButton
        type={!selectedIcon ? 'secondary' : 'primary'}
        size="m"
        disabled={!selectedIcon}
        onPress={onNext}>
        계속하기
      </RoundSquareButton>
    </View>
  );
};

const _container = css`
  flex: 1;
  background: #1e1e22;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 32px 34px;
  justify-content: space-between;
`;

const _title = css`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
`;

const iconsWrap = css`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
`;

const iconButton = css`
  width: 72px;
  justify-content: center;
  align-items: center;
  opacity: 0.2;
`;

const _iconText = css`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
`;
export default Step1;
