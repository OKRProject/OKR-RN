import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import {
  Icons,
  DefaultText as Text,
  RoundAddButton,
  Background,
} from '../../../components';
import {RootStackParamList} from '../../../navigation/main';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {}
const New = ({}: Props) => {
  return (
    <Background>
      <View>
        <TouchableOpacity>
          <Text>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>완료</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default New;
