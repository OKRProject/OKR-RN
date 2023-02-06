import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';

type Props = TouchableOpacityProps & {
  isSelected: boolean;
};
const RatioInput = ({isSelected, children, style, ...rest}: Props) => {
  return (
    <TouchableOpacity style={[_container, style]} {...rest}>
      <View style={_outer}>{isSelected && <View style={_inner} />}</View>
      <Text style={_text}>{children}</Text>
    </TouchableOpacity>
  );
};

const _container = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const _outer = css`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #fff;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
`;
const _inner = css`
  width: 14.5px;
  height: 14.5px;
  background-color: #1f92f2;
  border-radius: 14.5px;
`;

const _text = css`
  font-weight: 500;
  color: #fff;
  font-size: 16px;
`;

export default RatioInput;
