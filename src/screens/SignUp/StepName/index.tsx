import {View, Text} from 'react-native';
import React from 'react';
import {Layout} from '../components';

const desc = `이름은 나중에 언제든지 바꿀 수 있어요.
공백없이 8자 이하 사용 가능합니다.`;
const StepName = () => {
  return (
    <Layout title="이름을 입력해주세요" desc={desc}>
      <View></View>
    </Layout>
  );
};

export default StepName;
