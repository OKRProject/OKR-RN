import {View, Text} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {css} from '@emotion/native';
import {Theme} from 'react-native-calendars/src/types';

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
const ProjectCalendar = () => {
  return (
    <>
      <Calendar
        style={container}
        monthFormat={'yyyy년 MMM'}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        onDayPress={day => {
          console.log(day);
        }}
        theme={theme}
        markingType={'period'}
        markedDates={{
          '2022-10-23': {
            startingDay: true,
            color: '#70d7c7',
            textColor: 'white',
          },
          '2022-10-24': {color: '#70d7c7', textColor: 'white'},
          '2022-10-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
        }}
      />
    </>
  );
};

const container = css`
  background-color: 'transparent';
`;

export default ProjectCalendar;
