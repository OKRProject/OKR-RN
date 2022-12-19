import React, {useMemo} from 'react';
import {css} from '@emotion/native';
import {getDate, getElapsedDay} from '../../utils/calendar';
import {Calendar as ReactCalendars} from 'react-native-calendars';
import {Theme, MarkedDates} from 'react-native-calendars/src/types';
import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking';

type Props = {
  start: string; //yy-mm-dd
  end: string; //yy-mm-dd
  setDate: ({start, end}: {start: string; end: string}) => void;
  selectOneDate?: string; //yy-mm-dd
  highlightDates?: string[]; //yy-mm-dd[]
};
const Calendar = ({
  start,
  end,
  setDate,
  selectOneDate,
  highlightDates,
}: Props) => {
  const markedDates = useMemo<MarkedDates>(() => {
    const customStyle: MarkingProps = {
      customTextStyle: {fontWeight: '700'},
    };

    const highlights = highlightDates?.reduce(
      (prev, cur) => ({...prev, [cur]: customStyle}),
      {} as MarkedDates,
    );

    if (!start && !end) return {...highlights};
    if (start && start === end)
      return {
        ...highlights,
        [start]: selectedDayStyle,
      };
    if (start && end) {
      const dayLength = getElapsedDay({start, end});
      const dayList = Array.from({length: dayLength + 1}, (_, i) =>
        getDate(start, i),
      );
      return dayList.reduce(
        (prev, cur, idx) => {
          if (idx === 0)
            return {
              ...prev,
              [cur]: startDayStyle,
            };
          if (idx === dayLength)
            return {
              ...prev,
              [cur]: endDayStyle,
            };
          return {
            ...prev,
            [cur]: {
              ...periodDayStyle,
              color: selectOneDate ? '#1F92F2' : '#254766',
            },
          };
        },
        {...highlights} as MarkedDates,
      );
    }

    return {};
  }, [start, end, selectOneDate, highlightDates]);

  const markedDatesWithSelectOneDay = useMemo<MarkedDates>(
    () =>
      selectOneDate
        ? {
            ...markedDates,
            [selectOneDate]: {
              ...markedDates[selectOneDate],
              marked: true,
              dotColor: '#fff',
              customTextStyle: {fontWeight: '600', color: '#fff'},
            },
          }
        : markedDates,
    [markedDates, selectOneDate],
  );

  const handleSelectDay = (dateString: string) => {
    if (selectOneDate) return setDate({start: dateString, end: dateString});
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
        theme={{
          ...theme,
          dayTextColor: highlightDates ? '#636363' : '#fff',
        }}
        markingType={'period'}
        markedDates={markedDatesWithSelectOneDay}
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
  textColor: '#fff',
};

const endDayStyle = {endingDay: true, color: '#1F92F2', textColor: '#fff'};
const periodDayStyle = {color: '#254766', textColor: '#fff'};
const selectedDayStyle = {...startDayStyle, ...endDayStyle};

export default Calendar;
