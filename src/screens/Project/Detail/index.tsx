import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/main';
import {Background} from '../../../components';
import {ProjectDetailType} from '../../../api/project';
import Header from './Header';
import KRList from './KRList';
import ProjectObjective from './ProjectObjective';
import api from '../../../api';
import TeamModal from './TeamModal';
import TeamMemberAddModal from './TeamMemberAddModal';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {
  projectToken: string;
}
const Detail = ({projectToken, navigation}: Props) => {
  const [project, setProject] = useState<ProjectDetailType>();
  const [openModal, setOpenModal] = useState<
    'addMember' | 'menu' | undefined
  >();

  const init = async () => {
    const {data} = await api.project.getProjectDetail({projectToken});
    setProject(data);
  };
  const handleGoBack = () => navigation.navigate('Project', {type: 'main'});
  const handleClickModalClose = () => setOpenModal(undefined);
  const handleClickModalOpen = () => setOpenModal('menu');

  useEffect(() => {
    init();
  }, []);

  return (
    <Background>
      {project ? (
        <>
          <Header
            {...project}
            onClickBack={handleGoBack}
            onClickMenu={handleClickModalOpen}
          />
          <ProjectObjective {...project} />
          <KRList KRList={project.keyResults} projectTitle={project.name} />
          {openModal === 'menu' && (
            <TeamModal
              projectToken={project.projectToken}
              isVisible={openModal === 'menu'}
              onClickClose={handleClickModalClose}
              onClickAddMember={() => {
                setOpenModal('addMember');
              }}
            />
          )}
          {openModal === 'addMember' && (
            <TeamMemberAddModal
              projectToken={project.projectToken}
              isVisible={openModal === 'addMember'}
              onClose={() => setOpenModal('menu')}
              onComplete={() => setOpenModal('menu')}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </Background>
  );
};

export default Detail;
