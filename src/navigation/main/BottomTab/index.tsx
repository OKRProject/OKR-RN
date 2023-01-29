import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screens from '../../../screens';
import TabBar from './TabBar';
import {ProjectParam} from '..';

export type BottomStackParamList = {
  Calendar: undefined;
  MyPage: undefined;
  Project: ProjectParam;
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
      <BottomTab.Screen
        name="Project"
        component={screens.Project}
        initialParams={{type: 'main'}}
      />
      <BottomTab.Screen name="Calendar" component={screens.Calendar} />
      <BottomTab.Screen name="Feedback" component={screens.Feedback} />
      <BottomTab.Screen name="MyPage" component={screens.MyPage} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
