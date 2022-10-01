import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screens from '../../../screens';
import TabBar from './TabBar';

export type BottomStackParamList = {
  Calendar: undefined;
  MyPage: undefined;
  Project: undefined;
  Feedback: undefined;
};

const BottomTab = createBottomTabNavigator<BottomStackParamList>();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName="Project">
      <BottomTab.Screen name="MyPage" component={screens.MyPage} />
      <BottomTab.Screen name="Project" component={screens.Project} />
      <BottomTab.Screen name="Calendar" component={screens.Calendar} />
      <BottomTab.Screen name="Feedback" component={screens.Feedback} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
