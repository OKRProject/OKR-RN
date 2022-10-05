import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icons, DefaultText as Text} from '../../components';
import {css} from '@emotion/native';
import {ScrollView} from 'react-native-gesture-handler';
import Card from './Card';

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

const Project = () => {
  const [originProjectList, setOriginProjectList] = useState<ProjectType[]>([]);
  const [filteredProjectList, setFilteredProjectList] = useState<ProjectType[]>(
    [],
  );
  const [selectedTab, setSelectedTab] = useState<keyof typeof tabList>('whole');

  useEffect(() => {
    //todo api
    setOriginProjectList(projectData);
    // setFilteredProjectList(projectData);
  }, []);

  useEffect(() => {
    setFilteredProjectList(
      selectedTab === 'whole'
        ? originProjectList
        : originProjectList.filter(project => project.type === selectedTab),
    );
  }, [selectedTab, originProjectList]);

  const handleClickTab = (tab: keyof typeof tabList) => setSelectedTab(tab);

  return (
    <SafeAreaView style={container}>
      <View style={header}>
        <Icons.Logo />
        <TouchableOpacity>
          <Icons.Alarm color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={bodyContainer}>
        <View style={wrapper}>
          <Text style={user}>권용환님의 프로젝트</Text>
          <View style={menu}>
            <View style={tabs}>
              {(Object.keys(tabList) as [keyof typeof tabList]).map(tabKey => (
                <TouchableOpacity
                  key={`project_tab_${tabKey}`}
                  onPress={() => handleClickTab(tabKey)}>
                  <Text style={[tab]}>{tabList[tabKey]}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={filterButton}></TouchableOpacity>
          </View>
          <ScrollView style={projectWrapper}>
            {filteredProjectList.map(project => (
              <Card key={`project_card_${project.id}`} project={project} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Project;
const container = css`
  flex: 1;
  background-color: #18181b;
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
  padding: 39px 19px;
`;

const wrapper = css`
  border: 1px solid red;
  height: 100%;
`;

const user = css`
  color: #fff;
  font-weight: 600;
  font-size: 24px;
`;

const menu = css`
  border: 1px solid blue;
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
`;
const filterButton = css`
  width: 24px;
  height: 24px;
  border: 1px solid red;
`;

const projectWrapper = css`
  border: 1px solid green;
  flex: 1;
`;

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
