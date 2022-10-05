import React, {useMemo} from 'react';
import {View} from 'react-native';
import {css} from '@emotion/native';
import {ProjectType} from '..';
import {Icons, RoundCard, DefaultText as Text} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  project: ProjectType;
};

const Card = ({project}: Props) => {
  const {
    id,
    title,
    object,
    wholeIni,
    completedIni,
    member,
    startDt,
    endDt,
    isNew,
  } = useMemo(() => ({...project}), [project]);
  const percent = useMemo(
    () => Math.floor((completedIni / wholeIni) * 100),
    [wholeIni, completedIni],
  );

  const startDate = useMemo(
    () =>
      startDt
        .split('-')
        .reduce((prev, cur) => (prev ? `${prev}.${cur}` : cur), ''),
    [startDt],
  );

  const endDate = useMemo(
    () =>
      endDt
        .split('-')
        .reduce((prev, cur) => (prev ? `${prev}.${cur}` : cur), ''),
    [endDt],
  );

  return (
    <RoundCard style={container}>
      <View style={titleWrap}>
        <Text style={projectTitle}>{title}</Text>
        {isNew && <Text style={newHighlight}>NEW</Text>}
      </View>
      <Text style={objectDesc}>목표:{object}</Text>
      <View style={progressWrap}>
        <View style={progressBack}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#43D2FF', '#1F92F2']}
            style={[progress, {width: `${percent}%`}]}
          />
        </View>
        <Text style={progressText}>
          <Text style={highlight}>{percent}%</Text>/100%
        </Text>
      </View>
      <View style={bottom}>
        <View style={people}>
          <Icons.People />
          <Text style={peopleText}>{member}</Text>
        </View>
        <Text style={period}>
          {startDate} - {endDate}
        </Text>
      </View>
    </RoundCard>
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
const progress = css`
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
