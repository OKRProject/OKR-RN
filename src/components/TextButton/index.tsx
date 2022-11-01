import {css} from '@emotion/native';
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {DefaultText as Text} from '../../components';

type Props = TouchableOpacityProps;
const TextButton = ({style, children, ...rest}: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <Text style={[text, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

const text = css``;
export default TextButton;
