import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icons} from '../../../../components';
import {css} from '@emotion/native';

const Header = () => {
  return (
    <View style={container}>
      <TouchableOpacity style={button}>
        <Icons.Back />
      </TouchableOpacity>
    </View>
  );
};

const container = css`
  padding: 14px;
  background-color: red;
`;

const button = css`
  width: 24px;
  height: 24px;
`;
export default Header;
