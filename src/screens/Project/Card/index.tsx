import React, {useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {css} from '@emotion/native';
import {
  Icons,
  RoundCard,
  DefaultText as Text,
  Progress,
} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/main';
import {ProjectType} from '../../../api/project';

type NavigationProps = StackNavigationProp<RootStackParamList>;

type Props = {
  project: ProjectType;
  onLongPressCard: () => void;
};

const Card = ({project, onLongPressCard, ...rest}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const {
    projectToken,
    objective,
    teamMembersCount,
    progress,
    startDate: sdt,
    endDate: edt,
    newProject,
    completed,
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
    navigation.navigate('ProjectDetail', {
      projectToken,
    });

  return (
    <TouchableOpacity
      onPress={handleClickProject}
      onLongPress={onLongPressCard}>
      <RoundCard style={container} {...rest}>
        <View style={titleWrap}>
          <View
            style={css`
              flex-direction: row;
              flex: 1;
            `}>
            <Text
              style={[
                projectTitle,
                completed &&
                  css`
                    color: #616166;
                  `,
              ]}>
              {objective}
            </Text>
            {newProject && <Text style={newHighlight}>NEW</Text>}
            {completed && (
              <Text
                style={[
                  newHighlight,
                  css`
                    color: #1f92f2;
                  `,
                ]}>
                완료됨
              </Text>
            )}
          </View>
          <View style={people}>
            <Icons.People />
            <Text style={peopleText}>{teamMembersCount}</Text>
          </View>
        </View>
        <Progress
          percent={percent}
          style={progressWrap}
          figure={false}
          isCompleted={completed}
        />
        <View style={bottom}>
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
  justify-content: space-between;
  align-items: flex-start;
  max-width: 100%;
`;
const projectTitle = css`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  flex: 1;
`;
const newHighlight = css`
  font-weight: 700;
  font-size: 12px;
  line-height: 21px;
  color: #fdbd40;
  margin-left: 6px;
  width: 32px;
`;

const progressWrap = css`
  margin: 16px 0;
`;

const bottom = css`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const people = css`
  flex-direction: row;
  align-items: center;
`;

const peopleText = css`
  color: #616166;
  font-size: 14px;
  margin-left: 2px;
`;

const period = css`
  font-weight: 500;
  font-size: 12px;
  color: #616166;
`;
export default Card;
