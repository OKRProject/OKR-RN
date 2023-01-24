import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../../screens';
import userStore from '../../store/userStore';
import BottomTabNavigator from './BottomTab';
import {useAxiosInterceptor} from '../../hooks';
import {ProjectIniType} from '../../api/project';
import {clearUserSession} from '../../hooks/useSignOut';
import SplashScreen from 'react-native-splash-screen';

export type ProjectParam =
  | {type: 'main'}
  | {type: 'new'}
  | {type: 'detail'; projectToken: string};

export type IniParam =
  | {type: 'detail'; initiativeToken: string}
  | {type: 'feedback'; data: ProjectIniType};

export type MyPage = undefined | {type: 'detail'};

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Calendar: undefined;
  MyPage: MyPage;
  Onboard: undefined;
  Project: ProjectParam;
  Feedback: undefined;
  Bottom: undefined;
  Terms: undefined;
  Policy: undefined;
  Ini: IniParam;
  Notification: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  const [initAnimationTimeout, setInitAnimationTimeout] =
    useState<boolean>(false);
  const user = userStore(state => state.user);
  const isLoading = useAxiosInterceptor();

  // clearUserSession();

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 500);
    setTimeout(() => setInitAnimationTimeout(true), 1000);
  }, []);

  if (isLoading || !initAnimationTimeout) return <Screens.Splash />;

  return user ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Bottom" component={BottomTabNavigator} />
      <Stack.Screen name="Project" component={Screens.Project} />
      <Stack.Screen name="Ini" component={Screens.Ini} />
      <Stack.Screen name="Terms" component={Screens.Terms} />
      <Stack.Screen name="Policy" component={Screens.Policy} />
      <Stack.Screen name="Notification" component={Screens.Notification} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={Screens.SignIn} />
      <Stack.Screen name="SignUp" component={Screens.SignUp} />
      <Stack.Screen name="Terms" component={Screens.Terms} />
      <Stack.Screen name="Policy" component={Screens.Policy} />
    </Stack.Navigator>
  );
};

export default Main;
