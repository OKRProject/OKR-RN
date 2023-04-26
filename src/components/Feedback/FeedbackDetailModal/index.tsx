import {Image, View} from 'react-native';
import React from 'react';
import {DefaultText as Text} from '../../../components';
import {css} from '@emotion/native';
import {FeedbackType} from '../../../api/feedback';
import Modal from 'react-native-modal';
import {icons} from '..';

type Props = {
  onClose: () => void;
  isVisible: boolean;
} & FeedbackType;

const FeedbackDetailModal = ({isVisible, onClose, ...rest}: Props) => {
  const {opinion, grade, profileImage, writerJob, writerName} = rest;
  return (
    <Modal isVisible={isVisible} style={_background} onBackdropPress={onClose}>
      <View
        style={[_container, {borderBottomWidth: 1, borderBottomColor: '#111'}]}>
        <View style={_header}>
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
          </View>
          <View style={_tag}>
            <Image
              style={{height: 20, width: 20}}
              resizeMode="contain"
              source={icons[grade].img}
            />
          </View>
        </View>
        <Text style={_opinionText}>{opinion}</Text>
      </View>
    </Modal>
  );
};

const _background = css`
  justify-content: center;
  align-items: center;
`;

const _container = css`
  background-color: #202227;
  padding: 32px 16px;
  align-items: flex-start;
  border-radius: 8px;
  margin: 12px 18px;
  max-width: 100%;
`;

const _header = css`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border: 0px solid #35353a;
  border-bottom-width: 1px;
  padding-bottom: 6px;
`;

const _tag = css``;

const _opinionText = css`
  margin: 16px 0;
  font-size: 16px;
`;
const _writerWrap = css`
  flex-direction: row;
  align-items: center;
`;
const _imgWrap = css`
  border: 1px solid #57575a;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
`;

const _writer = css`
  font-size: 16px;
  color: #a9a9a9;
  margin-left: 6px;
`;
export default FeedbackDetailModal;
