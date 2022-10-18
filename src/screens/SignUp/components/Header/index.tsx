import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icons} from '../../../../components';
import {css} from '@emotion/native';

type Props = {
  onClickBack: () => void;
};
const Header = ({onClickBack}: Props) => {
  return (
    <View style={container}>
      <TouchableOpacity
        style={button}
        onPress={onClickBack}
        hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
        <Icons.Back />
      </TouchableOpacity>
    </View>
  );
};

const container = css`
  padding: 14px;
`;

const button = css`
  width: 24px;
  height: 24px;
`;
export default Header;
