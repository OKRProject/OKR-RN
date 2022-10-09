import {css, ReactNativeStyle} from '@emotion/native';
import React, {ReactNode} from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import {DefaultText as Text} from '../../components';

type Props = {
  children: ReactNode;
  style?: ReactNativeStyle;
};
const TextButton = ({style, children}: Props) => {
  return (
    <TouchableOpacity>
      <Text style={[text, style ? style : css``]}>{children}</Text>
    </TouchableOpacity>
  );
};

const text = css``;
export default TextButton;
