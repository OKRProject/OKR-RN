import {View, Text, TouchableOpacity} from 'react-native';
import React, {ReactNode, useMemo} from 'react';
import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {NavigationHelpers, ParamListBase} from '@react-navigation/native';
import {BottomStackParamList} from '../..';
import Icons from '../../../../../components/Icons';
import {css} from '@emotion/native';

type Props = {
  isFocused: boolean;
  options: BottomTabNavigationOptions;
  routeName: keyof BottomStackParamList;
  routeKey: string;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

const titleList = {
  Calendar: '캘린더',
  MyPage: 'My',
  Project: '프로젝트',
  Feedback: '피드백',
};
const Tab = ({options, routeName, routeKey, navigation, isFocused}: Props) => {
  const Icon = useMemo<ReactNode>(() => {
    const color = isFocused ? '#fff' : '#636363';
    const iconList = {
      Calendar: <Icons.Calendar color={color} />,
      MyPage: <Icons.MyPage color={color} />,
      Project: <Icons.Project color={color} />,
      Feedback: <Icons.Feedback color={color} />,
    };

    return iconList[routeName];
  }, [isFocused]);
  const title = useMemo(() => titleList[routeName], []);

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({name: routeName, merge: true, params: undefined});
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: routeKey,
    });
  };
  return (
    <TouchableOpacity style={[tab]} onPress={onPress}>
      <View>{Icon}</View>
      <Text style={[text, isFocused && focus]}>{title}</Text>
    </TouchableOpacity>
  );
};

const tab = css`
  align-items: center;
  padding-top: 10px;
`;

const focus = css`
  color: #fff;
`;

const text = css`
  margin-top: 2px;
  color: #636363;
`;
export default Tab;
