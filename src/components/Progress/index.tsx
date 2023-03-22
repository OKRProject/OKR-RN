import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {css, ReactNativeStyle} from '@emotion/native';
import LinearGradient from 'react-native-linear-gradient';

const progressWrap = css`
  width: 100%;
`;

const progressBack = css`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  overflow: hidden;
  position: relative;
`;
const progressGauge = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 8px;
  background-color: red;
`;
const progressText = css`
  margin-top: 5px;
  margin-left: auto;
  color: #636363;
  font-size: 12px;
  line-height: 18px;
`;
const highlight = css`
  color: #1f92f2;
`;

type Props = {
  percent: number;
  style?: StyleProp<ViewStyle>;
  figure?: boolean;
};
const Progress = ({percent, style, figure = true}: Props) => {
  return (
    <View style={[progressWrap, style]}>
      <View style={progressBack}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#43D2FF', '#1F92F2']}
          style={[progressGauge, {width: `${percent}%`}]}
        />
      </View>
      {figure && (
        <Text style={progressText}>
          <Text style={highlight}>{percent}%</Text>/100%
        </Text>
      )}
    </View>
  );
};

export default Progress;
