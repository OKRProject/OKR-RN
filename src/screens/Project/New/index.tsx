import {css} from '@emotion/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {
  Icons,
  DefaultText as Text,
  DefaultInput as Input,
  RoundAddButton,
  Background,
  RoundCard,
  RoundInput,
  RoundSquareButton,
} from '../../../components';

import {RootStackParamList} from '../../../navigation/main';
import Card from './Card';
import produce from 'immer';

import Header from './Header';
import OKR from './OKR';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import GenericTouchable from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

export type ProjectType = {
  title: string;
  startDt: string;
  endDt: string;
  object: string;
  krList: string[];
};

const initProject: ProjectType = {
  title: '',
  startDt: '',
  endDt: '',
  object: '',
  krList: [''],
};
interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {}
const New = ({}: Props) => {
  const [{title, startDt, endDt, object, krList}, setProject] =
    useState<ProjectType>(initProject);
  const [isPeriodPage, setPeriodPage] = useState<boolean>(false);
  const titleRef = useRef<TextInput>(null);

  const handleTitle = (title: string) => setProject(prev => ({...prev, title}));
  const handleClickTitle = () => {
    if (titleRef.current) titleRef.current.focus();
  };
  const handleClickPeriod = () => !isPeriodPage && setPeriodPage(true);

  return (
    <Background>
      <View style={container}>
        <Header onClickCancel={() => {}} onClickComplete={() => {}} />
        <Card title="프로젝트명" onPress={handleClickTitle}>
          <Input
            inputRef={titleRef}
            style={input}
            value={title}
            onChangeText={handleTitle}
            placeholder="다같이 런닝!"
          />
        </Card>
        <Card title="기간" style={period} onPress={handleClickPeriod}>
          <Text style={periodText}>00년 00월 00일 - 00년 00월 00일</Text>
        </Card>
      </View>
      <OKR setProject={setProject} object={object} krList={krList} />
    </Background>
  );
};

const container = css`
  padding: 0 24px;

  width: 100%;
  flex: 1;
`;

const input = css``;
const period = css`
  margin: 16px 0px 41px;
`;
const periodText = css`
  color: #535358;
`;
export default New;
