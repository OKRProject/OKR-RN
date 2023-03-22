import {CalendarUtils} from 'react-native-calendars';

export const getDate = (startDate: string, count: number) => {
  const date = new Date(startDate);
  const newDate = date.setDate(date.getDate() + count);
  return CalendarUtils.getCalendarDateString(newDate);
};

export const dateStringToObject = (date: string, isFullYear?: boolean) => {
  const newDate = new Date(date);
  return {
    yy: newDate
      .getFullYear()
      .toString()
      .slice(isFullYear ? 0 : 2),
    mm: (newDate.getMonth() + 1).toString(),
    dd: newDate.getDate().toString(),
  };
};

export const dateStringToViewText = (date: string, isFullYear?: boolean) => {
  const {yy, mm, dd} = dateStringToObject(date, isFullYear);
  return `${yy}년 ${mm}월 ${dd}일`;
};

export const getDayLabel = (date: string) => {
  let week = new Array(
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  );

  let today = new Date(date).getDay();
  let todayLabel = week[today];

  return todayLabel;
};
export const getElapsedDay = ({start, end}: {start: string; end: string}) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const elapsedMSec = endDate.getTime() - startDate.getTime();
  return elapsedMSec / 1000 / 60 / 60 / 24;
};
