import {TextInput, TextInputProps} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';

type Props = TextInputProps & {
  inputRef?: React.MutableRefObject<TextInput | null>;
};

const DefaultInput = ({style, inputRef, ...rest}: Props) => {
  return (
    <TextInput
      {...rest}
      ref={inputRef}
      style={[input, style]}
      placeholderTextColor="#535358"
    />
  );
};

const input = css`
  font-family: 'Pretendard';
  color: #a9a9a9;
  font-size: 14px;
  font-weight: 500;
`;

export default DefaultInput;
