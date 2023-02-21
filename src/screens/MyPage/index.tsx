import React from 'react';
import userStore from '../../store/userStore';
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
