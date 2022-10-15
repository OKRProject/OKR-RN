import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {Background} from '../../components';
import {Header} from './components';
import Layout from './components/Layout';
import StepName from './StepName';
import StepField from './StepField';
import StepDetail from './StepDetail';

type StepType = 'name' | 'field' | 'detail';
const StepPage: {[key in StepType]: ReactNode} = {
  name: <StepName />,
  field: <StepField />,
  detail: <StepDetail />,
};
const SignUp = () => {
  const [step, setStep] = useState<StepType>('name');
  return (
    <Background>
      <SafeAreaView>
        <Header />
        {StepPage[step]}
      </SafeAreaView>
    </Background>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
