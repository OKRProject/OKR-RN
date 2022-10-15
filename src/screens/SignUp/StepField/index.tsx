import {View, Text} from 'react-native';
import React from 'react';
import {Layout} from '../components';

const desc = `프로필에 표시될 대표 분야입니다.
협업 시 팀원들에게 보여집니다.`;
const StepField = () => {
  return (
    <Layout title="대표 분야를 선택해 주세요" desc={desc}>
      <View></View>
    </Layout>
  );
};

export default StepField;
