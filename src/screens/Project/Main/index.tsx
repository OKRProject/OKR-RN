import {View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Icons,
  DefaultText as Text,
  RoundAddButton,
  Background,
  SortingModal,
} from '../../../components';
import {css} from '@emotion/native';
import {ScrollView} from 'react-native-gesture-handler';
import userStore from '../../../store/userStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Card from './Card';
import {RootStackParamList} from '../../../navigation/main';
import api from '../../../api';
import {ProjectType, ProjectTypeEnum, SortTypeEnum} from '../../../api/project';
import EmptyCard from './EmptyCard';
import {SortStatus} from '../../../components/SortingModal';

const tabList: {[key in ProjectTypeEnum]: string} = {
  WHOLE: '전체',
  SINGLE: '개인',
  TEAM: '팀',
};

interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {}

const Main = ({navigation}: Props) => {
  const {name} = userStore(({user}) => ({name: user?.name}));
  const [sort, setSort] = useState<SortStatus>({
    includeFinished: true,
    sort: SortTypeEnum.RECENTLY_CREATE,
  });
  const [openSortModal, setOpenSortModal] = useState<boolean>(false);
  const [originProjectList, setOriginProjectList] = useState<ProjectType[]>([]);
  const [filteredProjectList, setFilteredProjectList] = useState<ProjectType[]>(
    [],
  );
  const [selectedTab, setSelectedTab] = useState<keyof typeof tabList>(
    ProjectTypeEnum.whole,
  );

  const init = async () => {
    try {
      const {data} = await api.project.getProjectList(sort);
      setOriginProjectList(data.content);
    } catch (e: any) {
      console.log(e.response.data);
    }
    //todo api
  };
  useEffect(() => {
    init();
  }, [sort]);

  useEffect(() => {
    setFilteredProjectList(
      selectedTab === ProjectTypeEnum.whole
        ? originProjectList
        : originProjectList.filter(
            project => project.projectType === selectedTab,
          ),
    );
  }, [selectedTab, originProjectList]);

  const handleClickTab = (tab: keyof typeof tabList) => setSelectedTab(tab);

  const handleClickAddProject = () =>
    navigation.navigate('Project', {type: 'new'});

  const handleClickNotification = () => navigation.navigate('Notification');

  return (
    <Background style={container}>
      <View style={header}>
        <Image
          style={{height: 26, width: 84}}
          resizeMode="contain"
          source={require('../../../img/icn-logo-row.png')}
        />
        <TouchableOpacity onPress={handleClickNotification}>
          <Icons.Alarm color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={bodyContainer}>
        <View style={wrapper}>
          <Text style={user}>{name}님의 프로젝트</Text>
          <View style={menu}>
            <View style={tabs}>
              {(Object.keys(tabList) as [keyof typeof tabList]).map(tabKey => (
                <TouchableOpacity
                  style={selectedTab === tabKey && highlightBorder}
                  key={`project_tab_${tabKey}`}
                  onPress={() => handleClickTab(tabKey)}>
                  <Text
                    style={[tab, selectedTab === tabKey ? highlight : css``]}>
                    {tabList[tabKey]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={filterButton}
              onPress={() => setOpenSortModal(true)}>
              <Icons.Filter />
            </TouchableOpacity>
          </View>
          <ScrollView style={projectWrapper}>
            {filteredProjectList.length > 0 ? (
              filteredProjectList.map(project => (
                <Card
                  key={`project_card_${project.projectToken}`}
                  project={project}
                />
              ))
            ) : (
              <EmptyCard />
            )}
          </ScrollView>
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
    </Background>
  );
};

const container = css`
  position: relative;
`;

const floatingAddButton = css`
  position: absolute;
  right: 17px;
  bottom: 19px;
  z-index: 999;
`;

const header = css`
  width: 100%;
  padding: 0 20px;
  height: 52px;
  flex-direction: row;
  justify-content: space-between;
`;

const bodyContainer = css`
  flex: 1;
  padding: 39px 19px 0 19px;
`;

const wrapper = css`
  flex: 1;
`;

const user = css`
  color: #fff;
  font-weight: 600;
  font-size: 24px;
`;

const menu = css`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 19px;
  margin-bottom: 28px;
`;

const tabs = css`
  flex-direction: row;
  width: 118px;
  justify-content: space-between;
`;

const tab = css`
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  padding-bottom: 6px;
`;

const highlightBorder = css`
  border-bottom-width: 2px;
  border-color: #1f92f2;
`;

const highlight = css`
  color: #1f92f2;
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
