import React, {useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {css} from '@emotion/native';
import {
  Icons,
  RoundCard,
  DefaultText as Text,
  Progress,
} from '../../../../components';
import {ProjectType} from '../../../../api/project';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../navigation/main';

type NavigationProps = StackNavigationProp<RootStackParamList>;

type Props = {
  project: ProjectType;
};

const Card = ({project, ...rest}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const {
    projectToken,
    name,
    object,
    teamMembers,
    progress,
    sdt,
    edt,
    newProject,
  } = useMemo(() => project, [project]);
  const percent = useMemo(() => Math.floor(progress), [progress]);

  const startDate = useMemo(
    () =>
      sdt.split('-').reduce((prev, cur) => (prev ? `${prev}.${cur}` : cur), ''),
    [sdt],
  );

  const endDate = useMemo(
    () =>
      edt.split('-').reduce((prev, cur) => (prev ? `${prev}.${cur}` : cur), ''),
    [edt],
  );

  const handleClickProject = () =>
    navigation.navigate('Project', {
      type: 'detail',
      projectToken,
    });

  return (
    <TouchableOpacity onPress={handleClickProject}>
      <RoundCard style={container} {...rest}>
        <View style={titleWrap}>
          <Text style={projectTitle}>{name}</Text>
          {newProject && <Text style={newHighlight}>NEW</Text>}
        </View>
        <Text style={objectDesc}>목표:{object}</Text>
        <Progress percent={percent} style={progressWrap} />
        <View style={bottom}>
          <View style={people}>
            <Icons.People />
            <Text style={peopleText}>{teamMembers.length}</Text>
          </View>
          <Text style={period}>
            {startDate} - {endDate}
          </Text>
        </View>
      </RoundCard>
    </TouchableOpacity>
  );
};

const container = css`
  padding: 21px 17px 14px 17px;
  margin-bottom: 12px;
`;

const titleWrap = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 9px;
`;
const projectTitle = css`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;
const newHighlight = css`
  font-weight: 700;
  font-size: 12px;
  color: #fdbd40;
  margin-left: 6px;
`;
const objectDesc = css`
  color: #a9a9a9;
  font-weight: 400;
  font-size: 14px;
`;
const progressWrap = css`
  margin: 24px 0;
`;

const bottom = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const people = css`
  flex-direction: row;
  align-items: center;
`;

const peopleText = css`
  color: #a9a9a9;
  font-size: 14px;
  margin-left: 2px;
`;

const period = css`
  font-weight: 500;
  font-size: 12px;
  color: #636363;
`;
export default Card;
