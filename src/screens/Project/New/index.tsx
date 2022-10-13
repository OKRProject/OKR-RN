import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';

import {Background} from '../../../components';
import {RootStackParamList} from '../../../navigation/main';
import Main from './Main';
import Period from './Period';

export type NewProjectType = {
  title: string;
  startDt: string;
  endDt: string;
  object: string;
  krList: string[];
};

const initProject: NewProjectType = {
  title: '',
  startDt: '',
  endDt: '',
  object: '',
  krList: [''],
};
interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {}
const New = ({}: Props) => {
  const [project, setProject] = useState<NewProjectType>(initProject);
  const [isPeriodPage, setPeriodPage] = useState<boolean>(false);

  const handleTitle = (title: string) => setProject(prev => ({...prev, title}));
  const handleChangePeriod = (startDt: string, endDt: string) => {};
  return (
    <Background>
      {isPeriodPage ? (
        <Period
          onChangeTitle={handleTitle}
          onChangePeriod={handleChangePeriod}
          {...project}
        />
      ) : (
        <Main
          {...project}
          onChangeTitle={handleTitle}
          setPeriodPage={setPeriodPage}
          setProject={setProject}
        />
      )}
    </Background>
  );
};

export default New;
