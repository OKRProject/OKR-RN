import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../../screens';
import userStore from '../../store/userStore';
import BottomTabNavigator from './BottomTab';

export type ProjectParam = {type: 'main'} | {type: 'new'} | {type: 'detail'};

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Calendar: undefined;
  MyPage: undefined;
  Onboard: undefined;
  Project: ProjectParam;
  Feedback: undefined;
  Bottom: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  const user = userStore(state => state.user);

  return user ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Bottom" component={BottomTabNavigator} />
      <Stack.Screen name="Project" component={Screens.Project} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={Screens.SignIn} />
    </Stack.Navigator>
  );
};

export default Main;
