import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Background, CalendarModal} from '../../../components';
import {RootStackParamList} from '../../../navigation/main';
import {getDate} from '../../../utils/calendar';
import Main from './Main';

export type NewProjectType = {
  title: string;
  startDt: string;
  endDt: string;
  objective: string;
  krList: string[];
};

const today = new Date().toDateString();

const initProject: NewProjectType = {
  title: '',
  startDt: getDate(today, 0),
  endDt: getDate(today, 6),
  objective: '',
  krList: [''],
};
interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {}
const New = ({}: Props) => {
  const [project, setProject] = useState<NewProjectType>(initProject);
  const [isPeriodPage, setPeriodPage] = useState<boolean>(false);

  const handleTitle = (title: string) => setProject(prev => ({...prev, title}));
  const handleChangePeriod = (startDt: string, endDt: string) => {
    setProject(prev => ({...prev, startDt, endDt}));
    setPeriodPage(false);
  };
  const handleCancelSelectPeriod = () => setPeriodPage(false);
  return (
    <Background>
      <Main
        {...project}
        onChangeTitle={handleTitle}
        setPeriodPage={setPeriodPage}
        setProject={setProject}
      />
      <CalendarModal
        isVisible={isPeriodPage}
        startDt={project.startDt}
        endDt={project.endDt}
        onCancel={handleCancelSelectPeriod}
        onChangePeriod={handleChangePeriod}
      />
    </Background>
  );
};

export default New;
