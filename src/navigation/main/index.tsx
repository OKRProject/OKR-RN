import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../../screens';
import userStore from '../../store/userStore';
import BottomTabNavigator from './BottomTab';
import {useAxiosInterceptor} from '../../hooks';
import {KeyResultType, ProjectIniType, ProjectType} from '../../api/project';
import {clearUserSession} from '../../hooks/useSignOut';
import SplashScreen from 'react-native-splash-screen';
import EncryptedStorage from 'react-native-encrypted-storage';

export type IniParam = Pick<ProjectIniType, 'initiativeToken'> &
  Pick<KeyResultType, 'keyResultToken'>;

export type WriteFeedbackParam = Pick<ProjectIniType, 'initiativeToken'> &
  Partial<Pick<KeyResultType, 'keyResultToken'>>;

export type AddKRParam = Pick<ProjectType, 'projectToken'>;

export type AddIniParam = Pick<
  KeyResultType,
  'keyResultToken' | 'keyResultName'
> &
  Pick<ProjectType, 'projectToken'>;
export type MyPage = undefined | {type: 'detail'};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Calendar: undefined;
  MyPage: MyPage;
  Onboard: undefined;
  Project: undefined;
  ProjectNew: undefined;
  ProjectDetail: {projectToken: string};
  Feedback: undefined;
  Bottom: undefined;
  Terms: undefined;
  Policy: undefined;
  Ini: IniParam;
  Notification: undefined;
  AddKR: AddKRParam;
  AddIni: AddIniParam;
  WriteFeedback: WriteFeedbackParam;
  RequireFeedback: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
  const [initAnimationTimeout, setInitAnimationTimeout] =
    useState<boolean>(false);
  const [firstScreen, setFirstScreen] = useState<keyof RootStackParamList>();

  const user = userStore(state => state.user);
  const isLoading = useAxiosInterceptor();

  const getOnBoardPassed = async () => {
    const passed = await EncryptedStorage.getItem('onboard');

    if (passed) setFirstScreen('SignIn');
    else setFirstScreen('Onboard');
  };

  useEffect(() => {
    if (!isLoading && initAnimationTimeout && !!firstScreen)
      SplashScreen.hide();
  }, [isLoading, initAnimationTimeout, firstScreen]);

  useEffect(() => {
    setTimeout(() => setInitAnimationTimeout(true), 1000);
    getOnBoardPassed();
  }, []);

  if (!firstScreen) return <></>;
  return user ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Bottom" component={BottomTabNavigator} />
      <Stack.Screen name="Project" component={Screens.Project} />
      <Stack.Screen name="ProjectDetail" component={Screens.ProjectDetail} />
      <Stack.Screen name="ProjectNew" component={Screens.ProjectNew} />
      <Stack.Screen name="Ini" component={Screens.Ini} />
      <Stack.Screen name="Terms" component={Screens.Terms} />
      <Stack.Screen name="Policy" component={Screens.Policy} />
      <Stack.Screen name="Notification" component={Screens.Notification} />
      <Stack.Screen name="AddKR" component={Screens.AddKR} />
      <Stack.Screen name="AddIni" component={Screens.AddIni} />
      <Stack.Screen name="WriteFeedback" component={Screens.WriteFeedback} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      // {...{initialRouteName: passedOnboard === 'pass' ? 'SignIn' : 'Onboard'}}
      initialRouteName={firstScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={Screens.SignIn} />
      <Stack.Screen name="SignUp" component={Screens.SignUp} />
      <Stack.Screen name="Terms" component={Screens.Terms} />
      <Stack.Screen name="Policy" component={Screens.Policy} />
      <Stack.Screen name="Onboard" component={Screens.Onboard} />
    </Stack.Navigator>
  );
};

export default Main;
