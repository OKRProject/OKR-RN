import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';

type Props = {
  onClickCancel: () => void;
  onClickComplete: () => void;
};
const Header = ({onClickCancel, onClickComplete}: Props) => {
  return (
    <View style={header}>
      <View style={buttons}>
        <TouchableOpacity onPress={onClickCancel}>
          <Text style={cancelButton}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickComplete}>
          <Text style={completeButton}>완료</Text>
        </TouchableOpacity>
      </View>
      <Text style={title}>새 프로젝트</Text>
    </View>
  );
};

const header = css`
  padding-bottom: 20px;
  padding-top: 11px;
`;

const buttons = css`
  margin-left: auto;
  flex-direction: row;
  margin-bottom: 9px;
`;
const cancelButton = css`
  font-size: 16px;
  font-weight: 400;
  color: #a9a9a9;
`;
const completeButton = css`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-left: 16px;
`;

const title = css`
  font-weight: 600;
  font-size: 24px;
  color: #fff;
`;
export default Header;
