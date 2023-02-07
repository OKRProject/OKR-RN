import {View, TextInputProps} from 'react-native';
import React, {useRef} from 'react';
import DefaultInput from '../DefaultInput';
import {css, ReactNativeStyle} from '@emotion/native';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Icons from '../Icons';

type Props = TextInputProps & {
  onDelete?: () => void;
  containerStyle?: ReactNativeStyle;
};
const RoundInput = ({onDelete, containerStyle, style, ...rest}: Props) => {
  const inputRef = useRef<TextInput>(null);
  const handleClickInputParent = () => {
    if (inputRef.current) inputRef.current.focus();
  };
  return (
    <View
      onStartShouldSetResponder={event => true}
      onTouchEnd={e => {
        e.stopPropagation();
      }}>
      <TouchableWithoutFeedback
        style={[container, containerStyle]}
        onPress={handleClickInputParent}>
        <DefaultInput {...rest} style={[input, style]} inputRef={inputRef} />
        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={deleteButton}>
            <Icons.Close color="#535358" />
          </TouchableOpacity>
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

const container = css`
  flex-direction: row;
  padding: 9px 10px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
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
