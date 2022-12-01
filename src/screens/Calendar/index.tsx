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
const today = new Date().toDateString();

const Calendar = () => {
  const [{start, end}, setDate] = useState<{start: string; end: string}>({
    start: getDate(today, 0),
    end: getDate(today, 0),
  });
  const [selectedDate, setSelectedDate] = useState<string>(getDate(today, 0));
  const [iniListByDate, setIniListByDate] = useState<ProjectIniType[]>([]);

  const getIniListByDate = async () => {
    try {
      const targetDay = selectedDate.replace(/\-/g, '');
      const {data} = await api.project.getIniListByDate(targetDay);
      setIniListByDate(data);
    } catch (e: any) {
      console.log(e.response.data);
    }
  };
  useEffect(() => {
    getIniListByDate();
  }, [selectedDate]);

  const handleSelectIni = (dates: {start: string; end: string}) =>
    setDate(dates);

  const handleSelectDate = (dates: {start: string; end: string}) => {
    setSelectedDate(dates.start);
    setDate({start: '', end: ''});
  };
  return (
    <Background>
      <Header title="캘린더" />
      <DefaultCalendar
        start={start}
        end={end}
        setDate={handleSelectDate}
        selectOneDate={selectedDate}
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
