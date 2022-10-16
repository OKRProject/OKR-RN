import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {css} from '@emotion/native';
import {Header, Title} from '../components';
import {DefaultText as Text, RoundCard} from '../../../../components';
import ProjectCalendar from './ProjectCalendar';
import {dateStringToViewText} from '../../../../utils/calendar';

type Props = {
  title: string;
  startDt: string;
  endDt: string;
  onChangeTitle: (title: string) => void;
  onChangePeriod: (startDt: string, endDt: string) => void;
  onCancel: () => void;
};
const Period = ({
  title,
  startDt,
  endDt,
  onChangeTitle,
  onCancel,
  onChangePeriod,
}: Props) => {
  const [{start, end}, setDate] = useState<{
    start: string;
    end: string;
  }>({start: startDt, end: endDt});

  const viewStartDt = useMemo<string>(
    () => dateStringToViewText(start),
    [start],
  );

  const viewEndDt = useMemo<string>(() => dateStringToViewText(end), [end]);

  const handleCompletePeriod = () => start && end && onChangePeriod(start, end);

  return (
    <View style={container}>
      <Header onClickCancel={onCancel} onClickComplete={handleCompletePeriod} />
      <Title title={title} onChangeTitle={onChangeTitle} />
      <RoundCard style={period}>
        <Text style={cardTitle}>기간</Text>
        <View style={dateHeader}>
          <View style={[dateWrap, marginRight]}>
            <Text style={date}>{viewStartDt}</Text>
          </View>
          <View style={dateWrap}>
            <Text style={date}>{viewEndDt}</Text>
          </View>
        </View>
        <ProjectCalendar selectDay={setDate} startDt={start} endDt={end} />
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
  flex: 1;
`;
const date = css`
  font-size: 16px;
  width: 100%;
  text-align: center;
`;

const marginRight = css`
  margin-right: 13px;
`;

const dateHeader = css`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 23px;
`;
export default Period;
