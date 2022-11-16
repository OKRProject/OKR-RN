import {Image, ImageRequireSource, View} from 'react-native';
import React from 'react';
import {FeedbackEnum, FeedbackType} from '../../api/feedback';
import {css} from '@emotion/native';
import {DefaultText as Text} from '..';

const icons: {[key in FeedbackEnum]: {img: ImageRequireSource; title: string}} =
  {
    BEST_RESULT: {img: require('../../img/icn-best.png'), title: '최고의 결과'},
    BURNING_PASSION: {
      img: require('../../img/icn-burning.png'),
      title: '불타는 열정',
    },
    COMMUNI_KING: {
      img: require('../../img/icn-communication.png'),
      title: '소통왕',
    },
    GOOD_IDEA: {img: require('../../img/icn-idea.png'), title: '아이디어 굿!'},
  };
type Props = FeedbackType;

const Feedback = ({
  text,
  grade,
  profileImage,
  writerJob,
  writerName,
}: Props) => {
  return (
    <View
      style={[container, {borderBottomWidth: 1, borderBottomColor: '#111'}]}>
      <View style={tag}>
        <Image
          style={{height: 20, width: 20}}
          resizeMode="contain"
          source={icons[grade].img}
        />
        <Text style={tagText}>{icons[grade].title}</Text>
      </View>
      <Text style={opinion}>{text}</Text>
      <View style={writerWrap}>
        <View style={imgWrap}>
          {profileImage && <Image source={{uri: profileImage}} />}
        </View>
        <Text style={writer}>
          {writerName} {writerJob}
        </Text>
      </View>
    </View>
  );
};

const container = css`
  background-color: #18181b;
  padding: 16px 20px;
  align-items: flex-start;
`;

const tag = css`
  flex-direction: row;
  align-items: center;
  background: #27272a;
  border-radius: 99px;
  padding: 6px 10px;
`;

const tagText = css`
  font-weight: 500;
  margin-left: 6px;
`;

//todo 말줄임
const opinion = css`
  margin: 16px 0;
  font-size: 16px;
`;
const writerWrap = css`
  flex-direction: row;
  align-items: center;
`;
const imgWrap = css`
  border: 1px solid #57575a;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #999;
`;

const writer = css`
  font-size: 16px;
  color: #a9a9a9;
  margin-left: 6px;
`;
export default Feedback;
