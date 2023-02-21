import {
  Dimensions,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  View,
  ViewabilityConfigCallbackPairs,
  ViewToken,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {DefaultText as Text} from '../../components';
import {css} from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/main';
import EncryptedStorage from 'react-native-encrypted-storage';

const data = [
  {
    title: 'OKR을 쉽고 간단하게!',
    desc: `플래그와 함께 목표를 중심으로 프로젝트를 관리하고 달성해 보세요 `,
    image: require('../../img/onboard_0.png'),
  },
  {
    title: '모두의 현황을 한눈에',
    desc: `팀원을 초대하고 함께 나아가보세요 각자의 진척도를 파악할 수 있어요`,
    image: require('../../img/onboard_1.png'),
  },
  {
    title: '오늘의 해야 할 일은?',
    desc: '캘린더에서 오늘의 업무 리스트를 확인해 보세요',
    image: require('../../img/onboard_2.png'),
  },
  {
    title: '피드백은 성장의 밑거름',
    desc: `내가 마무리한 업무에 대한 건강한 피드백을 받아볼 수 있어요`,
    image: require('../../img/onboard_3.png'),
  },
];

const Onboard = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const [page, setPage] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) => setPage(viewableItems[0].index ?? 0);

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
    [
      {
        onViewableItemsChanged,
        viewabilityConfig: {viewAreaCoveragePercentThreshold: 50},
      },
    ],
  );
  useEffect(() => {
    const {width} = Dimensions.get('window');
    setWidth(width);
  }, []);

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={_container}>
      <View style={_wrapper}>
        <FlatList
          contentContainerStyle={css`
            align-items: center;
            flex-direction: row;
          `}
          horizontal
          data={[0, 1, 2, 3]}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => (
            <View style={[_round, item === page && _active]} />
          )}
        />
        <FlatList
          horizontal
          pagingEnabled
          data={data}
          contentContainerStyle={css`
            flex-direction: row;
          `}
          keyExtractor={item => item.title}
          showsHorizontalScrollIndicator={false}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          renderItem={({item}) => {
            return (
              <View
                style={[
                  {width, padding: 20},
                  css`
                    padding-top: 0;
                  `,
                ]}>
                <Text style={_title}>{item.title}</Text>
                <Text style={_desc}>{item.desc}</Text>
                <Image
                  style={[{width: '100%', height: 254}]}
                  resizeMode="contain"
                  source={item.image}
                />
              </View>
            );
          }}
        />
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          if (page === 3) {
            navigate('SignIn');
            EncryptedStorage.setItem('onboard', 'pass');
          }
        }}>
        <View style={[_button, page === 3 && _active]}>
          <Text style={_buttonText}>시작하기</Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Onboard;

const _container = css`
  width: 100%;
  flex: 1;
  background-color: #18181b;
  min-height: 0;
`;

const _wrapper = css`
  flex: 1;
  align-items: center;
  padding-top: 40px;
`;

const _button = css`
  height: 97px;
  padding-bottom: 34px;
  align-items: center;
  justify-content: center;
  background-color: #a9a9a9;
`;

const _buttonText = css`
  font-size: 18px;
  font-weight: 700;
`;

const _active = css`
  background-color: #1f92f2;
`;

const _round = css`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 4px;
  background-color: #636363;
`;

const _title = css`
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
`;

const _desc = css`
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  padding: 20px 40px;
`;
