import React, {useEffect, useState} from 'react';
import {
  Background,
  Header,
  Calendar as DefaultCalendar,
} from '../../components';
import {getDate} from '../../utils/calendar';
import {ProjectIniType} from '../../api/project';
import api from '../../api';
import ProjectIniList from './ProjectIniList';
import {css} from '@emotion/native';

const today = new Date().toDateString();

const Calendar = () => {
  const [{start, end}, setDate] = useState<{start: string; end: string}>({
    start: getDate(today, 0),
    end: getDate(today, 0),
  });
  const [selectedDate, setSelectedDate] = useState<string>(getDate(today, 0));
  const [iniListByDate, setIniListByDate] = useState<ProjectIniType[]>([]);
  const [activeIniListDatesByMonth, setActiveIniListDatesByMonth] =
    useState<string[]>();

  const getIniListByDate = async () => {
    try {
      const targetDay = selectedDate.replace(/\-/g, '');
      const {data} = await api.project.getIniListByDate(targetDay);
      setIniListByDate(data);
    } catch (e: any) {
      console.log(e.response.data);
    }
  };

  const getActiveIniListDatesByMonth = async () => {
    const todayString = getDate(today, 0);
    const list = todayString.split('-');
    const year = list[0];
    const month = list[1];
    if (year && month) {
      const yyyymm = `${year}-${month}`;
      const {data} = await api.project.getIniDatesByMonth(yyyymm);
      setActiveIniListDatesByMonth(data);
    }
  };
  useEffect(() => {
    getIniListByDate();
  }, [selectedDate]);

  useEffect(() => {
    getActiveIniListDatesByMonth();
  }, []);

  const handleSelectIni = (dates: {start: string; end: string}) =>
    setDate(dates);

  const handleSelectDate = (dates: {start: string; end: string}) => {
    setSelectedDate(dates.start);
    setDate({start: '', end: ''});
  };
  return (
    <Background>
      <Header
        title="캘린더"
        titleStyle={css`
          font-size: 28px;
        `}
      />
      <DefaultCalendar
        start={start}
        end={end}
        setDate={handleSelectDate}
        selectOneDate={selectedDate}
        highlightDates={activeIniListDatesByMonth}
      />
      <ProjectIniList
        iniList={iniListByDate}
        onClick={handleSelectIni}
        selectedDate={selectedDate}
      />
    </Background>
  );
};

export default Calendar;
