import {css, ReactNativeStyle} from '@emotion/native';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import GenericTouchable from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

import {DefaultText as Text, RoundCard} from '../../../../components';

type Props = {
  title: string;
  children: ReactNode;
  style?: ReactNativeStyle;

  onPress?: () => void;
};
const Card = ({title, children, style, onPress}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <RoundCard style={style}>
        <View style={wrapper}>
          <Text style={cardTitle}>{title}</Text>
          {children}
        </View>
      </RoundCard>
    </TouchableWithoutFeedback>
  );
};

const wrapper = css`
  padding: 20px 28px;
`;

const cardTitle = css`
  font-weight: 600;
  font-size: 20px;
  color: #fdbd40;
  line-height: 24px;
  margin-bottom: 7px;
`;
export default Card;
