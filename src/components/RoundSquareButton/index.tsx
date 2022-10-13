import {TouchableOpacityProps, TouchableOpacity} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {DefaultText as Text} from '..';

const buttonColor = {
  primary: '#1F92F2',
  disable: '#A9A9A9',
  secondary: '#636363',
};

const buttonSize = {
  s: '42px',
  m: '52px',
  l: '68px',
};
type Props = TouchableOpacityProps & {
  type: keyof typeof buttonColor;
  size: keyof typeof buttonSize;
  children: string;
};
const RoundSquareButton = ({type, size, children, ...rest}: Props) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[
        container,
        css`
          height: ${buttonSize[size]};
          background-color: ${buttonColor[type]};
        `,
      ]}>
      <Text style={text}>{children}</Text>
    </TouchableOpacity>
  );
};

const container = css`
  border-radius: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const text = css`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
export default RoundSquareButton;
