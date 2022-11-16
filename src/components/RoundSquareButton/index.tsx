import {TouchableOpacityProps, TouchableOpacity} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {DefaultText as Text} from '..';

const buttonColor = {
  primary: '#1F92F2',
  disable: '#A9A9A9',
  secondary: '#636363',
  dark: '#27272A',
};

const buttonSize = {
  s: '42px',
  m: '52px',
  l: '60px',
  xl: '68px',
};
type Props = TouchableOpacityProps & {
  type: keyof typeof buttonColor;
  size: keyof typeof buttonSize;
  children: string;
  isSelected?: boolean;
};
const RoundSquareButton = ({
  type,
  size,
  children,
  isSelected,
  style,
  disabled,
  ...rest
}: Props) => {
  return (
    <TouchableOpacity
      {...rest}
      disabled={type === 'disable' || disabled}
      style={[
        container,
        css`
          height: ${buttonSize[size]};
          background-color: ${buttonColor[type]};
        `,
        style,
        isSelected && selected,
      ]}>
      <Text style={[text, isSelected ? selectedText : css``]}>{children}</Text>
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

const selected = css`
  border: 1px solid #1f92f2;
`;

const selectedText = css`
  color: #1f92f2;
`;
export default RoundSquareButton;
