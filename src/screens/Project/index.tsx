import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons from '../../components/Icons';
import {css} from '@emotion/native';

const Project = () => {
  return (
    <SafeAreaView style={container}>
      <View style={header}>
        <Icons.Logo />
        <TouchableOpacity>
          <Icons.Alarm color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={bodyContainer}>
        <View style={wrapper}></View>
      </View>
    </SafeAreaView>
  );
};

export default Project;
const container = css`
  flex: 1;
  background-color: #18181b;
`;
const header = css`
  width: 100%;
  padding: 0 20px;
  height: 52px;

  flex-direction: row;
  justify-content: space-between;
`;

const bodyContainer = css`
  flex: 1;
  padding: 39px 19px;
`;

const wrapper = css`
  border: 1px solid red;
  height: 100%;
`;
