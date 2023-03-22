import {View} from 'react-native';
import React from 'react';
import {
  Header,
  RoundSquareButton,
  DefaultText as Text,
  Calendar,
} from '../../../components';
import {css} from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  onPrev: () => void;
  onSelectDates: ({start, end}: {start: string; end: string}) => void;
  startDate: string;
  endDate: string;
  onComplete: () => void;
};
const Step2 = ({
  onPrev,
  onSelectDates,
  startDate,
  endDate,
  onComplete,
}: Props) => {
  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={_container}>
      <Header onBack={onPrev} title="새 행동전략" />
      <View style={container}>
        <View
          style={css`
            padding: 24px;
          `}>
          <Text style={_title}>행동 전략의 날짜를 정하세요</Text>
          <Text style={_desc}>다양한 일정을 고려해서 행동 전략의 마감일을</Text>
          <Text style={_desc}>정해보세요</Text>
        </View>
        <View style={_wrapper}>
          <Calendar start={startDate} end={endDate} setDate={onSelectDates} />
          <View
            style={css`
              padding: 0 24px;
            `}>
            <RoundSquareButton onPress={onComplete} size="m" type={'primary'}>
              추가하기
            </RoundSquareButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step2;
const _container = css`
  width: 100%;
  flex: 1;
  background-color: #18181b;
  min-height: 0;
`;

const container = css`
  flex: 1;
  padding: 0px;
  background-color: #18181b;
  width: 100%;
  margin-left: auto;
`;

const _title = css`
  font-weight: 700;
  font-size: 26px;
  line-height: 34px;
`;

const _desc = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #a9a9a9;
`;

const _wrapper = css`
  flex: 1;
  margin-top: 79px;
  justify-content: space-between;
  background-color: #202227;
  padding: 24px 0 48px;
`;
