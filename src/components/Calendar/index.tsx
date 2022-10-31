import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {DefaultText as Text, RoundCard} from '..';
import {css} from '@emotion/native';
import {
  dateStringToViewText,
  getDate,
  getElapsedDay,
} from '../../utils/calendar';
import {Calendar as ReactCalendars} from 'react-native-calendars';
import {Theme, MarkedDates} from 'react-native-calendars/src/types';

type Props = {
  start: string; //yy-mm-dd
  end: string; //yy-mm-dd
  setDate: ({start, end}: {start: string; end: string}) => void;
  title?: string;
};
const Calendar = ({start, end, setDate, title}: Props) => {
  const viewStartDt = useMemo<string>(
    () => dateStringToViewText(start),
    [start],
  );

  const viewEndDt = useMemo<string>(() => dateStringToViewText(end), [end]);

  const markedDates = useMemo<MarkedDates>(() => {
    if (!start && !end) return {};
    if (start && start === end)
      return {
        [start]: selectedDayStyle,
      };
    if (start && end) {
      const dayLength = getElapsedDay({start, end});
      const dayList = Array.from({length: dayLength + 1}, (_, i) =>
        getDate(start, i),
      );
      return dayList.reduce((prev, cur, idx) => {
        if (idx === 0)
          return {
            [cur]: startDayStyle,
          };
        if (idx === dayLength)
          return {
            ...prev,
            [cur]: endDayStyle,
          };
        return {...prev, [cur]: periodDayStyle};
      }, {} as MarkedDates);
    }

    return {};
  }, [start, end]);

  const handleSelectDay = (dateString: string) => {
    if (start && start === end && getElapsedDay({start, end: dateString}) >= 0)
      return setDate({start, end: dateString});
    return setDate({start: dateString, end: dateString});
  };

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
      <>
        <ReactCalendars
          style={container}
          monthFormat={'yyyy년 MMM'}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          onDayPress={({dateString}) => handleSelectDay(dateString)}
          theme={theme}
          markingType={'period'}
          markedDates={markedDates}
        />
      </>
    </RoundCard>
  );
};

const container = css`
  background-color: 'transparent';
`;

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

const theme: Theme = {
  calendarBackground: 'transparent',
  textSectionTitleColor: '#fff',
  dayTextColor: '#fff',
  textDisabledColor: '#636363',
  textDayFontSize: 16,
  textDayHeaderFontSize: 16,
  textDayFontFamily: 'Pretendard',
  textMonthFontFamily: 'Pretendard',
  textDayHeaderFontFamily: 'Pretendard',
  textDayFontWeight: '300',
  textDayHeaderFontWeight: '400',
  textMonthFontWeight: '400',
  arrowColor: '#A9A9A9',
  monthTextColor: '#A9A9A9',
};

const startDayStyle = {
  startingDay: true,
  color: '#1F92F2',
  textColor: 'white',
};

const endDayStyle = {endingDay: true, color: '#1F92F2', textColor: 'white'};
const periodDayStyle = {color: '#254766', textColor: 'white'};
const selectedDayStyle = {...startDayStyle, ...endDayStyle};

export default Calendar;
