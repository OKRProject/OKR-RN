import React from 'react';
import {View, ViewProps} from 'react-native';
import {css} from '@emotion/native';

type Props = ViewProps;

const RoundCard = ({children, style}: Props) => {
  return <View style={[container, style]}>{children}</View>;
};

const container = css`
  background: #27272a;
  border: 1px solid #35353a;
  border-radius: 12px;
`;
export default RoundCard;
