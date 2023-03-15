import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';
import {Background} from '../../components';
import {ProjectDetailType} from '../../api/project';
import Header from './Header';
import KRList from './KRList';
import ProjectObjective from './ProjectObjective';
import api from '../../api';
import TeamModal from './TeamModal';
import TeamMemberAddModal from './TeamMemberAddModal';
import query from '../../query';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'ProjectDetail'> {}
const Detail = ({route, navigation}: Props) => {
  const projectToken = route.params.projectToken;
  const [project, setProject] = useState<ProjectDetailType>();
  const [openModal, setOpenModal] = useState<
    'addMember' | 'menu' | undefined
  >();

  const {data} = query.project.useGetProjectDetail({projectToken});

  const handleGoBack = () => navigation.navigate('Project');
  const handleClickModalClose = () => setOpenModal(undefined);
  const handleClickModalOpen = () => setOpenModal('menu');

  useEffect(() => {
    if (data) setProject(data.data);
  }, [data]);

  return (
    <Background>
      {project ? (
        <>
          <Header
            onClickBack={handleGoBack}
            onClickMenu={handleClickModalOpen}
          />
          <ProjectObjective {...project} />
          <KRList
            KRList={project.keyResults}
            projectToken={project.projectToken}
          />
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
