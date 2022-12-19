import {View} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {DefaultText as Text} from '../../../../components';

type Props = {
  objective: string;
};
const ProjectObjective = ({objective}: Props) => {
  return (
    <View style={container}>
      <Text style={tag}>목표(O)</Text>
      <Text style={title}>{objective}</Text>
    </View>
  );
};

const container = css`
  padding: 42px 24px;
`;

const tag = css`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
`;

const title = css`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #fdbd40;
`;
export default ProjectObjective;
