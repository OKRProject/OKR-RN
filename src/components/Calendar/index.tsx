import React, {useMemo} from 'react';
import {css} from '@emotion/native';
import {getDate, getElapsedDay} from '../../utils/calendar';
import {Calendar as ReactCalendars} from 'react-native-calendars';
import {Theme, MarkedDates} from 'react-native-calendars/src/types';

type Props = {
  start: string; //yy-mm-dd
  end: string; //yy-mm-dd
  setDate: ({start, end}: {start: string; end: string}) => void;
};
const Calendar = ({start, end, setDate}: Props) => {
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
  );
};

const container = css`
  background-color: 'transparent';
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
