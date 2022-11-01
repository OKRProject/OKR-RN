import {View} from 'react-native';
import React, {useMemo} from 'react';
import {Calendar, DefaultText as Text, RoundCard} from '..';
import {css} from '@emotion/native';
import {dateStringToViewText} from '../../utils/calendar';

type Props = {
  start: string; //yy-mm-dd
  end: string; //yy-mm-dd
  setDate: ({start, end}: {start: string; end: string}) => void;
  title?: string;
};
const SelectCalendar = ({start, end, setDate, title}: Props) => {
  const viewStartDt = useMemo<string>(
    () => dateStringToViewText(start),
    [start],
  );

  const viewEndDt = useMemo<string>(() => dateStringToViewText(end), [end]);

  return (
    <RoundCard style={[period, !title ? {paddingTop: 31} : {}]}>
      {title && <Text style={cardTitle}>{title}</Text>}
      <View style={dateHeader}>
        <View style={[dateWrap, marginRight]}>
          <Text style={date}>{viewStartDt}</Text>
        </View>
        <View style={dateWrap}>
          <Text style={date}>{viewEndDt}</Text>
        </View>
      </View>
      <Calendar start={start} end={end} setDate={setDate} />
    </RoundCard>
  );
};

const cardTitle = css`
  font-weight: 600;
  font-size: 20px;
  color: #fdbd40;
  line-height: 24px;
  margin-bottom: 18px;
`;
const period = css`
  margin: 16px 0px 41px;
  padding: 20px 28px;
`;

const dateWrap = css`
  background: #636363;
  border-radius: 4px;
  padding: 4.5px 12px;
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

export default SelectCalendar;
