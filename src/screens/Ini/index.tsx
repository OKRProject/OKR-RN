import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';
import {View} from 'react-native';
import {Background, DefaultText as Text, Header} from '../../components';
import {css} from '@emotion/native';
import Description from './Description';
import Feedbacks from './Feedbacks';
import {ScrollView} from 'react-native-gesture-handler';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Ini'> {}

const Ini = ({route, navigation}: Props) => {
  const {iniName, endDate, dday, iniSeq, ...rest} = useMemo(
    () => route.params.data,
    [route.params.data],
  );
  const handleBack = () => navigation.goBack();

  return (
    <Background>
      <Header onBack={handleBack} title={`Ini ${route.params.data.iniSeq}`} />
      <ScrollView>
        <View style={summeryWrap}>
          <Text style={project}>{route.params.title}</Text>
          <Text style={iniTitle}>{iniName}</Text>
          <Text style={endDt}>
            마감일: {endDate} {dday}
          </Text>
        </View>
        <Description {...rest} />
        <Feedbacks iniId={iniSeq} />
      </ScrollView>
    </Background>
  );
};

const summeryWrap = css`
  padding: 22px 30px 27px;
`;
const project = css`
  font-weight: 600;
  font-size: 16px;
  color: #636363;
`;

const iniTitle = css`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #fdbd40;
  margin: 8px 0 14px;
`;

const endDt = css`
  font-weight: 500;
`;
export default Ini;
