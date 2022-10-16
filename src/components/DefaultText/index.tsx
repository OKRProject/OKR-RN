import React, {ReactNode} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {css, ReactNativeStyle} from '@emotion/native';
type Props = TextProps & {
  children: ReactNode;
};
const DefaultText = ({children, style}: Props) => {
  return <Text style={[defaultText, style]}>{children}</Text>;
};

const defaultText = css`
  font-family: 'Pretendard';
  font-size: 14px;
  color: #fff;
`;

export default DefaultText;
