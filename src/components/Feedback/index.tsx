import {Image, ImageRequireSource, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {FeedbackEnum, FeedbackType} from '../../api/feedback';
import {css} from '@emotion/native';
import {DefaultText as Text} from '..';
import FeedbackDetailModal from './FeedbackDetailModal';

export const icons: {
  [key in FeedbackEnum]: {img: ImageRequireSource; title: string};
} = {
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

const Feedback = ({...rest}: Props) => {
  const {opinion, grade, profileImage, writerJob, writerName, initiativeName} =
    rest;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <View
          style={[
            _container,
            {borderBottomWidth: 1, borderBottomColor: '#111'},
          ]}>
          <View style={_header}>
            <Text style={_title}>{initiativeName}</Text>
          </View>
          <Text style={_opinionText}>
            ↳ {opinion.slice(0, 82)}
            {opinion.length > 82 && '...'}
          </Text>
          <View style={_writerWrap}>
            <View style={_imgWrap}>
              {profileImage && (
                <Image
                  source={{uri: profileImage}}
                  style={{width: '100%', height: '100%'}}
                />
              )}
            </View>
            <Text style={_writer}>
              {writerName} ({writerJob})
            </Text>
            <View style={_tag}>
              <Image
                style={{height: 20, width: 20}}
                resizeMode="contain"
                source={icons[grade].img}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <FeedbackDetailModal
        onClose={() => setModalOpen(false)}
        isVisible={modalOpen}
        {...rest}
      />
    </>
  );
};

const _container = css`
  background-color: #202227;
  padding: 16px 20px;
  align-items: flex-start;
  border-radius: 8px;
  margin-bottom: 14px;
  max-width: 100%;
`;

const _header = css`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border: 0px solid #35353a;
  border-bottom-width: 1px;
  padding-bottom: 8px;
`;

const _title = css`
  color: #1f92f2;
`;

const _tag = css`
  flex-direction: row;
  align-items: center;
  background: #27272a;
  border-radius: 99px;
  padding: 6px 10px;
  margin-left: auto;
`;

const _opinionText = css`
  margin: 16px 0;
  font-size: 16px;
`;
const _writerWrap = css`
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
  width: 100%;
`;
const _imgWrap = css`
  border: 1px solid #57575a;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #999;
`;

const _writer = css`
  font-size: 16px;
  color: #a9a9a9;
  margin-left: 6px;
`;
export default Feedback;
