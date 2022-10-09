import {View, Text} from 'react-native';

import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {EdgeInsets} from 'react-native-safe-area-context';
import React from 'react';
import {css} from '@emotion/native';
import Tab from './Tab';
import {BottomStackParamList} from '..';
import {useRoute} from '@react-navigation/native';

type Props = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  insets: EdgeInsets;
};

const TabBar = ({navigation, state, descriptors, ...rest}: Props) => {
  const route = useRoute();
  console.log(route.name);
  return (
    <View style={container}>
      {state.routes.map((route, index) => (
        <Tab
          key={`bottom_tab_${route.name}`}
          isFocused={state.index === index}
          options={descriptors[route.key].options}
          routeName={route.name as keyof BottomStackParamList}
          routeKey={route.key}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

const container = css`
  width: 100%;
  height: 84px;
  flex-direction: row;
  justify-content: space-around;
  background-color: #212121;
`;
export default TabBar;
