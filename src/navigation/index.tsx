import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';

import React, {useEffect} from 'react';
import {clearUserSession} from '../hooks/useSignOut';
import Main from './main';

const Navigation = () => {
  const routeNameRef = React.useRef<string | null>(null);
  const navigationRef =
    React.useRef<NavigationContainerRef<ReactNavigation.RootParamList> | null>(
      null,
    );
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const currentRoute = navigationRef.current?.getCurrentRoute();
        if (currentRoute) routeNameRef.current = currentRoute.name;
      }}
      onStateChange={async () => {
        const currentRoute = navigationRef.current?.getCurrentRoute();
        const previousRouteName = routeNameRef.current;
        const currentRouteName = currentRoute ? currentRoute.name : '';

        routeNameRef.current = currentRouteName;
      }}>
      <Main />
    </NavigationContainer>
  );
};

export default Navigation;
