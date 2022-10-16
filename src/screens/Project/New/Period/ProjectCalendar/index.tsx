import {css} from '@emotion/native';
import React, {useMemo, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {Theme, MarkedDates} from 'react-native-calendars/src/types';
import {getElapsedDay, getDate} from '../../../../../utils/calendar';

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

type Props = {
  startDt: string;
  endDt: string;
  selectDay: (period: {start: string; end: string}) => void;
};

const ProjectCalendar = ({startDt, endDt, selectDay}: Props) => {
  const markedDates = useMemo<MarkedDates>(() => {
    if (!startDt && !endDt) return {};
    if (startDt && startDt === endDt)
      return {
        [startDt]: selectedDayStyle,
      };
    if (startDt && endDt) {
      const dayLength = getElapsedDay({start: startDt, end: endDt});
      const dayList = Array.from({length: dayLength + 1}, (_, i) =>
        getDate(startDt, i),
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
  }, [startDt, endDt]);

  const handleSelectDay = (dateString: string) => {
    if (
      startDt &&
      startDt === endDt &&
      getElapsedDay({start: startDt, end: dateString}) >= 0
    )
      return selectDay({start: startDt, end: dateString});
    return selectDay({start: dateString, end: dateString});
  };

  return (
    <>
      <Calendar
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
  );
};

const container = css`
  background-color: 'transparent';
`;

export default ProjectCalendar;
