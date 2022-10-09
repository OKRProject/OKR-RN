import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Icons,
  DefaultText as Text,
  RoundAddButton,
  Background,
} from '../../../components';
import {css} from '@emotion/native';
import {ScrollView} from 'react-native-gesture-handler';
import userStore from '../../../store/userStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Card from './Card';
import {BottomStackParamList} from '../../../navigation/main/BottomTab';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../../../navigation/main';

export type ProjectType = {
  type: 'team' | 'private';
  id: string;
  title: string;
  object: string;
  wholeIni: number;
  completedIni: number;
  member: number;
  startDt: string;
  endDt: string;
  isNew: boolean;
};

const tabList = {
  whole: '전체',
  private: '개인',
  team: '팀',
};

interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {}

const Main = ({navigation}: Props) => {
  const {name} = userStore(({user}) => ({name: user?.name}));
  const [originProjectList, setOriginProjectList] = useState<ProjectType[]>([]);
  const [filteredProjectList, setFilteredProjectList] = useState<ProjectType[]>(
    [],
  );
  const [selectedTab, setSelectedTab] = useState<keyof typeof tabList>('whole');

  useEffect(() => {
    //todo api
    setOriginProjectList(projectData);
  }, []);

  useEffect(() => {
    setFilteredProjectList(
      selectedTab === 'whole'
        ? originProjectList
        : originProjectList.filter(project => project.type === selectedTab),
    );
  }, [selectedTab, originProjectList]);

  const handleClickTab = (tab: keyof typeof tabList) => setSelectedTab(tab);
  const handleClickProject = (id: string) => {
    //todo navigate project detail with id
  };
  const handleClickAddProject = () =>
    navigation.navigate('Project', {type: 'new'});

  return (
    <Background style={container}>
      <View style={header}>
        <Icons.Logo />
        <TouchableOpacity>
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
            <TouchableOpacity style={filterButton}>
              <Icons.Filter />
            </TouchableOpacity>
          </View>
          <ScrollView style={projectWrapper}>
            {filteredProjectList.map(project => (
              <Card
                key={`project_card_${project.id}`}
                project={project}
                onPress={() => handleClickProject(project.id)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <RoundAddButton
        style={floatingAddButton}
        onPress={handleClickAddProject}
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

const projectData: ProjectType[] = [
  {
    type: 'team',
    id: 'asda-adsf1-fdfsdg1-addza1',
    title: 'OKR 프로젝트1',
    object: 'OKR 서비스 애플리케이션을 개발한다.',
    wholeIni: 32,
    completedIni: 11,
    member: 4,
    startDt: '2022-07-03',
    endDt: '2022-07-09',
    isNew: true,
  },
  {
    type: 'team',
    id: 'asda-adsf1-fdfsdg1-addza2',
    title: 'OKR 프로젝트2',
    object: 'OKR 서비스 애플리케이션을 개발한다.',
    wholeIni: 12,
    completedIni: 11,
    member: 2,
    startDt: '2022-07-03',
    endDt: '2022-07-09',
    isNew: false,
  },
  {
    type: 'private',
    id: 'asda-adsf1-fdfsdg1-addza3',
    title: 'OKR 프로젝트 개인3',
    object: 'OKR 서비스 애플리케이션을 개발한다.',
    wholeIni: 10,
    completedIni: 6,
    member: 1,
    startDt: '2022-07-03',
    endDt: '2022-07-09',
    isNew: false,
  },
];
