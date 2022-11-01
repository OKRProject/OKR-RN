import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';
import {View} from 'react-native';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Ini'> {}

const Ini = ({route, ...rest}: Props) => {
  return <View></View>;
};

export default Ini;
