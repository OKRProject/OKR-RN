import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../../screens';
import userStore from '../../store/userStore';
import BottomTabNavigator from './bottomTab';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Calendar: undefined;
  MyPage: undefined;
  Onboard: undefined;
  Project: undefined;
  Feedback: undefined;
  Root: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  const user = userStore(state => state.user);

  return user ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
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
