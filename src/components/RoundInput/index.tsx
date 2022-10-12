import {View, Text, TextInputProps} from 'react-native';
import React from 'react';
import DefaultInput from '../DefaultInput';
import {css} from '@emotion/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from '../Icons';

type Props = TextInputProps & {
  onDelete?: () => void;
};
const RoundInput = ({onDelete, style, ...rest}: Props) => {
  return (
    <View style={[container, style]}>
      <DefaultInput {...rest} style={input} />
      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={deleteButton}>
          <Icons.Close color="#535358" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const container = css`
  flex-direction: row;
  padding: 9px 10px;
  width: 100%;
  align-items: center;
  background: #27272a;
  border: 1px solid #35353a;
  border-radius: 12px;
  min-height: 42px;
`;
const input = css`
  flex: 1;
`;
const deleteButton = css`
  width: 24px;
  height: 24px;
  margin-left: 14px;
`;

export default RoundInput;
