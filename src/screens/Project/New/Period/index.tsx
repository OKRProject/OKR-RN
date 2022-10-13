import {View} from 'react-native';
import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {css} from '@emotion/native';
import {NewProjectType} from '..';
import {Card, Header, Title} from '../components';
import {DefaultText as Text, RoundCard} from '../../../../components';
import ProjectCalendar from './ProjectCalendar';

type Props = {
  title: string;
  startDt: string;
  endDt: string;
  onChangeTitle: (title: string) => void;
  onChangePeriod: (startDt: string, endDt: string) => void;
};
const Period = ({
  onChangeTitle,
  title,
  onChangePeriod,
  startDt,
  endDt,
}: Props) => {
  const [newStartDt, setNewStartDt] = useState<string>(startDt);
  const [newEndDt, setNewEndDt] = useState<string>(endDt);
  const viewStartDt = useMemo<string>(() => '22년 00월 00일', [newStartDt]);
  const viewEndDt = useMemo<string>(() => '22년 00월 00일', [newEndDt]);

  const handleCompletePeriod = () => {};

  return (
    <View style={container}>
      <Header onClickCancel={() => {}} onClickComplete={handleCompletePeriod} />
      <Title title={title} onChangeTitle={onChangeTitle} />
      <RoundCard style={period}>
        <Text style={cardTitle}>기간</Text>
        <View style={dateHeader}>
          <View style={dateWrap}>
            <Text style={date}>{viewStartDt}</Text>
          </View>
          <View style={dateWrap}>
            <Text style={date}>{viewStartDt}</Text>
          </View>
        </View>
        <ProjectCalendar />
      </RoundCard>
    </View>
  );
};

const container = css`
  padding: 0 24px;
  width: 100%;
  flex: 1;
`;

const period = css`
  margin: 16px 0px 41px;
  padding: 20px 28px;
`;

const cardTitle = css`
  font-weight: 600;
  font-size: 20px;
  color: #fdbd40;
  line-height: 24px;
  margin-bottom: 18px;
`;

const dateWrap = css`
  background: #636363;
  border-radius: 4px;
  padding: 4.5px 14.5px;
`;
const date = css`
  font-size: 16px;
`;

const dateHeader = css`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 23px;
`;
export default Period;
