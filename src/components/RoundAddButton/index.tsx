import {css, ReactNativeStyle} from '@emotion/native';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icons from '../Icons';

type Props = {
  onPress: () => void;
  style?: ReactNativeStyle | ReactNativeStyle[];
};

const RoundAddButton = ({style, ...rest}: Props) => {
  return (
    <TouchableOpacity style={[container, style]} {...rest}>
      <View style={icon}>
        <Icons.Plus />
      </View>
    </TouchableOpacity>
  );
};

const container = css`
  background-color: #1f92f2;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
`;

const icon = css`
  width: 30px;
  height: 30px;
`;

export default RoundAddButton;
