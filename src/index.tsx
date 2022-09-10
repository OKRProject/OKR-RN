import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './navigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: '#F9EFFD'}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
      </GestureHandlerRootView>
    </>
  );
};

export default App;
