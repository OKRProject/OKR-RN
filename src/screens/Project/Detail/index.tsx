import React, {useEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/main';
import {Background} from '../../../components';

import {ProjectDetailType} from '../../../api/project';
import Header from './Header';
import KRList from './KRList';
import ProjectObjective from './ProjectObjective';
import api from '../../../api';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {
  projectId: number;
}
const Detail = ({projectId, navigation}: Props) => {
  const [project, setProject] = useState<ProjectDetailType>();
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const init = async () => {
    const {data} = await api.project.getProjectDetail({id: projectId});
    setProject(data);
  };
  const handleGoBack = () => navigation.goBack();

  useEffect(() => {
    init();
  }, []);

  return (
    <Background>
      {project ? (
        <>
          <Header {...project} onClickBack={handleGoBack} />
          <ProjectObjective {...project} />
          <KRList krList={project.keyResult} />
        </>
      ) : (
        <></>
      )}
    </Background>
  );
};

export default Detail;
