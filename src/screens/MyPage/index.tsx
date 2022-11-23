import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Background,
  Header,
  DefaultText as Text,
  RoundSquareButton,
  Icons,
} from '../../components';
import userStore from '../../store/userStore';
import {css} from '@emotion/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/main';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Main from './Main';
import Detail from './Detail';

interface Props extends NativeStackScreenProps<RootStackParamList, 'MyPage'> {}

const MyPage = ({route}: Props) => {
  const {user} = userStore(({user}) => ({user}));

  if (user) {
    return route.params === undefined ? (
      <Main {...user} />
    ) : (
      <Detail {...user} />
    );
  }

  return <></>;
};

export default MyPage;
