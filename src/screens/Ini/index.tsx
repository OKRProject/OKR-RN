import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';

import WriteFeedback from './WriteFeedback';
import Detail from './Detail';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Ini'> {}

const Ini = ({route, navigation}: Props) => {
  return route.params.type === 'detail' ? (
    <Detail {...route.params.data} />
  ) : (
    <WriteFeedback {...route.params.data} />
  );
};

export default Ini;
