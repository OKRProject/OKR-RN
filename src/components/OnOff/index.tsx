import {Pressable, Animated, PressableProps, View} from 'react-native';
import React, {useEffect} from 'react';
import {css} from '@emotion/native';
import DefaultText from '../DefaultText';

type Props = PressableProps & {
  isOn: boolean;
  onToggle: () => void;
};
const OnOff = ({isOn, onToggle, children}: Props) => {
  const animatedOnOff = new Animated.Value(0);
  // const animatedButtonColor = new Animated.Value(0);

  useEffect(() => {
    if (isOn) {
      Animated.timing(animatedOnOff, {
        toValue: 1,
        useNativeDriver: false,
        duration: 500,
      }).start();
    } else {
      Animated.timing(animatedOnOff, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
      }).start();
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn) {
      Animated.timing(animatedOnOff, {
        toValue: 1,
        useNativeDriver: false,
        duration: 0,
      }).start();
    }
  }, []);

  const translate = animatedOnOff.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 15],
  });

  // const backgroundColorAnimated = animatedOnOff.interpolate({
  // inputRange: [0, 1],
  //   // outputRange: ['black', 'gray'],
  //   outputRange: ['rgba(169, 169, 169,1)', 'rgba(31, 146, 242,1)'],
  // });
  return (
    <Pressable style={_container} onPress={onToggle}>
      <View style={_outer}>
        <Animated.View
          style={[
            _inner,
            {
              transform: [{translateX: translate}],
              // backgroundColor: backgroundColorAnimated,
            },
          ]}
        />
      </View>
      <DefaultText style={_text}>{children as string}</DefaultText>
    </Pressable>
  );
};

const _container = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const _outer = css`
  width: 38px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #a9a9a9;
  position: relative;
`;

const _inner = css`
  background-color: #a9a9a9;
  width: 19px;
  height: 19px;
  border-radius: 20px;
  top: 1.5px;
`;

const _text = css`
  font-weight: 500;
  color: #fff;
  font-size: 16px;
  margin-left: 11px;
`;
export default OnOff;
