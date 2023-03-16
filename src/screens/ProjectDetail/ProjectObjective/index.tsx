import {Image, View} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {DefaultText as Text} from '../../../components';
import {dateStringToViewText} from '../../../utils/calendar';

type Props = {
  objective: string;
  startDate: string;
  endDate: string;
  teamMembersCount: number;
};
const ProjectObjective = ({
  objective,
  startDate,
  endDate,
  teamMembersCount,
}: Props) => {
  return (
    <View style={_container}>
      <Text style={_tag}>목표</Text>
      <Text style={_title}>{objective}</Text>
      <View style={_flex}>
        <Image
          style={{width: 20, height: 20}}
          source={require('../../../img/icn-calendar.png')}
        />
        <Text style={_text}>
          {dateStringToViewText(startDate)} - {dateStringToViewText(endDate)}
        </Text>
      </View>
      <View style={_flex}>
        <Image
          style={{width: 20, height: 20}}
          source={require('../../../img/icn-people.png')}
        />
        <Text style={_text}>{teamMembersCount}명 참여</Text>
      </View>
    </View>
  );
};

const _container = css`
  padding: 42px 24px;
`;

const _tag = css`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #616166;
`;

const _title = css`
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  margin-bottom: 13px;
`;

const _text = css`
  font-weight: 400;
  font-size: 16px;
  margin-left: 6px;
`;

const _flex = css`
  flex-direction: row;
  margin-bottom: 3px;
`;
export default ProjectObjective;
