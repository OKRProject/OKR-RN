import {View, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Icons,
  DefaultText as Text,
  RoundAddButton,
  Background,
  SortingModal,
  ProjectModal,
} from '../../components';
import {css} from '@emotion/native';
import userStore from '../../store/userStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Card from './Card';
import {RootStackParamList} from '../../navigation/main';
import api from '../../api';
import {
  ProjectType,
  ProjectTypeEnum,
  RoleTypeEnum,
  SortTypeEnum,
} from '../../api/project';
import EmptyCard from './EmptyCard';
import {SortStatus} from '../../components/SortingModal';
import query from '../../query';

const tabList: {[key in ProjectTypeEnum]: string} = {
  ALL: '전체',
  SINGLE: '개인',
  TEAM: '팀',
};

interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {}

const Main = ({navigation}: Props) => {
  const [page, setPage] = useState<number>(0);

  const {name} = userStore(({user}) => ({name: user?.name}));
  const [sort, setSort] = useState<SortStatus>({
    includeFinished: true,
    sort: SortTypeEnum.RECENTLY_CREATE,
  });
  const [openSortModal, setOpenSortModal] = useState<boolean>(false);
  const [originProjectList, setOriginProjectList] = useState<ProjectType[]>([]);
  const [selectedTab, setSelectedTab] = useState<ProjectTypeEnum>(
    ProjectTypeEnum.all,
  );
  const [selectedProject, setSelectedProject] = useState<ProjectType>();
  const [newNoti, setNewNoti] = useState<boolean>(false);

  const {data: projectList} = query.project.useGetProjectList({
    projectType: selectedTab,
    page,
  });

  useEffect(() => {
    getNotiList();
  }, []);

  useEffect(() => {
    projectList && setOriginProjectList(projectList?.data.content);
  }, [projectList]);

  const handleLoadMore = () => {
    if (projectList?.data.last === false) setPage(page + 1);
  };
  const getNotiList = async () => {
    const {data} = await api.user.getNotificationList();
    if (data?.some(item => item.status === 'NEW')) setNewNoti(true);
  };

  const handleClickTab = (tab: ProjectTypeEnum) => setSelectedTab(tab);

  const handleClickAddProject = () => {
    navigation.navigate('ProjectNew');
  };

  const handleClickNotification = () => navigation.navigate('Notification');

  return (
    <Background style={container}>
      <View style={header}>
        <Image
          style={{height: 26, width: 84}}
          resizeMode="contain"
          source={require('../../img/icn-logo-gray.png')}
        />
        <TouchableOpacity onPress={handleClickNotification}>
          <Icons.Alarm color={newNoti ? '#fff' : '#616166'} />
        </TouchableOpacity>
      </View>
      <View style={bodyContainer}>
        <View style={wrapper}>
          <Text style={user}>{name}님의 OKR</Text>
          <View style={menu}>
            <View style={tabs}>
              {(Object.keys(tabList) as [keyof typeof tabList]).map(tabKey => (
                <TouchableOpacity
                  style={[tabWrap, selectedTab === tabKey && highlightBorder]}
                  key={`project_tab_${tabKey}`}
                  onPress={() => handleClickTab(tabKey)}>
                  <Text
                    style={[tab, selectedTab === tabKey ? highlight : css``]}>
                    {tabList[tabKey]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* <TouchableOpacity
              style={filterButton}
              onPress={() => setOpenSortModal(true)}>
              <Icons.Filter />
            </TouchableOpacity> */}
          </View>
          {originProjectList.length > 0 ? (
            <FlatList
              style={projectWrapper}
              data={originProjectList}
              renderItem={({item}) => (
                <Card
                  project={item}
                  key={`project_card_${item.projectToken}`}
                  onLongPressCard={() => {
                    setSelectedProject(item);
                  }}
                />
              )}
              keyExtractor={(item, index) => item.projectToken}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={1}>
              {originProjectList.map(project => (
                <Card
                  project={project}
                  key={`project_card_${project.projectToken}`}
                  onLongPressCard={() => {
                    setSelectedProject(project);
                  }}
                />
              ))}
            </FlatList>
          ) : (
            <EmptyCard />
          )}
        </View>
      </View>
      <RoundAddButton
        style={floatingAddButton}
        onPress={handleClickAddProject}
      />
      <SortingModal
        isVisible={openSortModal}
        onClose={() => setOpenSortModal(false)}
        selected={sort.sort}
        includeComplete={sort.includeFinished}
        onSelect={type => setSort(prev => ({...prev, type}))}
        onIncludeSwitch={() =>
          setSort(prev => ({...prev, includeFinished: !prev.includeFinished}))
        }
      />
      <ProjectModal
        onClose={() => setSelectedProject(undefined)}
        isVisible={
          !!selectedProject && selectedProject.roleType === RoleTypeEnum.leader
        }
        projectToken={selectedProject?.projectToken!}
      />
    </Background>
  );
};

const container = css`
  position: relative;
`;

const floatingAddButton = css`
  position: absolute;
  right: 24px;
  bottom: 19px;
  z-index: 999;
`;

const header = css`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
`;

const bodyContainer = css`
  flex: 1;
  padding: 32px 24px 0 24px;
`;

const wrapper = css`
  flex: 1;
`;

const user = css`
  color: #fff;
  font-weight: 700;
  font-size: 26px;
`;

const menu = css`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 19px;
  margin-bottom: 28px;
`;

const tabs = css`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  height: 35px;
  border-bottom-width: 1px;
  border-color: #26262a;
`;

const tabWrap = css`
  flex: 1;
`;
const tab = css`
  color: #616166;
  font-weight: 500;
  font-size: 20px;
  padding-bottom: 6px;
  text-align: center;
`;

const highlightBorder = css`
  border-bottom-width: 2px;
  border-color: #fff;
`;

const highlight = css`
  color: #fff;
  font-weight: 700;
`;

const filterButton = css`
  width: 24px;
  height: 24px;
`;

const projectWrapper = css`
  flex: 1;
`;

export default Main;
