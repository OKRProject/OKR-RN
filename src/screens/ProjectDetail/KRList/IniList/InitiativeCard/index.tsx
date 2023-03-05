import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {RoundCard, DefaultText as Text} from '../../../../../components';
import {css} from '@emotion/native';
import {ProjectIniType} from '../../../../../api/project';

type Props = ProjectIniType & {
  onPress: () => void;
};
const InitiativeCard = ({
  initiativeIndex,
  initiativeName,
  user,
  dDay,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <RoundCard style={card}>
        <View style={left}>
          <Text style={[tag, tagHighlight]}>ini {initiativeIndex}</Text>
          <Text style={title}>{initiativeName}</Text>
        </View>
        <View style={right}>
          <Text style={tag}>{user.userName}</Text>
          <Text style={tag}>{dDay}</Text>
        </View>
      </RoundCard>
    </TouchableOpacity>
  );
};

const card = css`
  flex-direction: row;
  padding: 15px 19px;
  background: #363639;
  margin-bottom: 16px;
`;

const left = css`
  flex: 1;
  margin-right: 12px;
`;

const right = css`
  align-items: flex-end;
`;

const tag = css`
  font-size: 12px;
  line-height: 14px;
  color: #a9a9a9;
  font-weight: 500;
  margin-bottom: 4px;
`;

const tagHighlight = css`
  color: #1f92f2;
  font-weight: 700;
`;
const dayHighlight = css``;

const title = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-top: 9px;
`;

export default InitiativeCard;
