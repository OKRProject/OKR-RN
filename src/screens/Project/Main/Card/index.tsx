import React, {useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {css} from '@emotion/native';
import {Icons, RoundCard, DefaultText as Text} from '../../../../components';
import LinearGradient from 'react-native-linear-gradient';
import {ProjectType} from '../../../../api/project';
import {} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../navigation/main';

type NavigationProps = StackNavigationProp<RootStackParamList>;

type Props = {
  project: ProjectType;
  onPress: () => void;
};

const Card = ({project, ...rest}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const {
    id,
    name,
    object,
    teamMemberEmails,
    teamMemberProfileImages,
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
    navigation.navigate('Project', {type: 'detail', projectId: project.id});

  return (
    <TouchableOpacity onPress={handleClickProject}>
      <RoundCard style={container} {...rest}>
        <View style={titleWrap}>
          <Text style={projectTitle}>{name}</Text>
          {newProject && <Text style={newHighlight}>NEW</Text>}
        </View>
        <Text style={objectDesc}>목표:{object}</Text>
        <View style={progressWrap}>
          <View style={progressBack}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#43D2FF', '#1F92F2']}
              style={[progressGauge, {width: `${percent}%`}]}
            />
          </View>
          <Text style={progressText}>
            <Text style={highlight}>{percent}%</Text>/100%
          </Text>
        </View>
        <View style={bottom}>
          <View style={people}>
            <Icons.People />
            <Text style={peopleText}>{''}</Text>
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

const progressBack = css`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  overflow: hidden;
  position: relative;
`;
const progressGauge = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 8px;
  background-color: red;
`;
const progressText = css`
  margin-top: 5px;
  margin-left: auto;
  color: #636363;
  font-size: 12px;
  line-height: 18px;
`;
const highlight = css`
  color: #1f92f2;
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
