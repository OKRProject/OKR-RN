import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../../screens';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Calendar: undefined;
  MyPage: undefined;
  Onboard: undefined;
  Project: undefined;
  Feedback: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Screens.Home} />
      <Stack.Screen name="SignIn" component={Screens.SignIn} />
    </Stack.Navigator>
  );
};

export default Main;
