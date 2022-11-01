import {View, TextInputProps} from 'react-native';
import React, {useRef} from 'react';
import DefaultInput from '../DefaultInput';
import {css} from '@emotion/native';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Icons from '../Icons';

type Props = TextInputProps & {
  onDelete?: () => void;
};
const RoundInput = ({onDelete, style, ...rest}: Props) => {
  const inputRef = useRef<TextInput>(null);
  const handleClickInputParent = () => {
    if (inputRef.current) inputRef.current.focus();
  };
  return (
    <TouchableWithoutFeedback
      style={[container, style]}
      onPress={handleClickInputParent}>
      <DefaultInput {...rest} style={input} inputRef={inputRef} />
      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={deleteButton}>
          <Icons.Close color="#535358" />
        </TouchableOpacity>
      )}
    </TouchableWithoutFeedback>
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
  height: 100%;
`;
const deleteButton = css`
  width: 24px;
  height: 24px;
  margin-left: 14px;
`;

export default RoundInput;
