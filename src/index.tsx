import React from 'react';
import {StatusBar, Text, useColorScheme, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {config} from './config';
import Navigation from './navigation';
import CodePush from 'react-native-code-push';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {BaseToast, BaseToastProps} from 'react-native-toast-message';

const toastConfig = {
  defaultToast: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#fff', borderRadius: 12}}
      text1Style={{
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        textAlign: 'center',
      }}
    />
  ),
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient();
  config();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{flex: 1, backgroundColor: '#F9EFFD'}}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Navigation />
        </GestureHandlerRootView>
      </QueryClientProvider>
      <Toast config={toastConfig} />
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

export default App;
// export default CodePush(codePushOptions)(App);
