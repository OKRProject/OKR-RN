import {css, ReactNativeStyle} from '@emotion/native';
import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native';

type Props = {
  children: ReactNode;
  style?: ReactNativeStyle | ReactNativeStyle[];
};
const Background = ({children, style}: Props) => {
  return <SafeAreaView style={[container, style]}>{children}</SafeAreaView>;
};
const container = css`
  width: 100%;
  flex: 1;
  background-color: #181818;
  min-height: 0;
`;
export default Background;
