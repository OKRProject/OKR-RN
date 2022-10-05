import React, {ReactNode, useMemo} from 'react';
import {View} from 'react-native';
import {css, ReactNativeStyle} from '@emotion/native';

type Props = {
  children: ReactNode;
  style?: ReactNativeStyle;
};
const RoundCard = ({children, style}: Props) => {
  return <View style={[container, style]}>{children}</View>;
};

const container = css`
  background: #27272a;
  border: 1px solid #35353a;
  border-radius: 12px;
`;
export default RoundCard;
