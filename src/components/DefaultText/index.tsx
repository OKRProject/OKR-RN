import React, {ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';
import {css, ReactNativeStyle} from '@emotion/native';
type Props = {
  children: ReactNode;
  style?: ReactNativeStyle | ReactNativeStyle[];
};
const DefaultText = ({children, style}: Props) => {
  return <Text style={[defaultText, style]}>{children}</Text>;
};

const defaultText = css`
  font-family: 'Pretendard';
`;

export default DefaultText;
