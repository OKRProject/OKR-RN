import {Image, View} from 'react-native';
import React from 'react';
import {Background, DefaultText as Text} from '../../components';
import {css} from '@emotion/native';

const Splash = () => {
  return (
    <Background>
      <View style={container}>
        <Image
          style={{height: 160, width: 160}}
          resizeMode="contain"
          source={require('../../img/icn-logo-col.png')}
        />
      </View>
    </Background>
  );
};

export default Splash;

const container = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
