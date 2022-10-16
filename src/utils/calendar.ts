import {CalendarUtils} from 'react-native-calendars';

export const getDate = (startDate: string, count: number) => {
  const date = new Date(startDate);
  const newDate = date.setDate(date.getDate() + count);
  return CalendarUtils.getCalendarDateString(newDate);
};

export const dateStringToObject = (date: string) => {
  const newDate = new Date(date);
  return {
    yy: newDate.getFullYear().toString().slice(2),
    mm: (newDate.getMonth() + 1).toString(),
    dd: newDate.getDate().toString(),
  };
};

export const dateStringToViewText = (date: string) => {
  const {yy, mm, dd} = dateStringToObject(date);
  return `${yy}년 ${mm}월 ${dd}일`;
};

export const getElapsedDay = ({start, end}: {start: string; end: string}) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const elapsedMSec = endDate.getTime() - startDate.getTime();
  return elapsedMSec / 1000 / 60 / 60 / 24;
};
