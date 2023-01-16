import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {config} from './config';
import Navigation from './navigation';
import CodePush from 'react-native-code-push';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  config();
  return (
    <>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: '#F9EFFD'}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
      </GestureHandlerRootView>
    </>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    title: 'update by codepush for flag',
    optionalUpdateMessage: 'codepush',
    optionalInstallButtonLabel: 'update',
    optionalIgnoreButtonLabel: 'ignore.',
  },
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(App);
