import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {Header} from '../components';
import {NewProjectTypeInput} from '..';
import {Calendar, RoundSquareButton} from '../../../components';

type Props = Pick<NewProjectTypeInput, 'startDate' | 'endDate'> & {
  onNext: () => void;
  onPrev: () => void;
  onSelectDates: ({start, end}: {start: string; end: string}) => void;
};
const Step2 = ({
  onPrev,
  onNext,
  startDate: sdt,
  endDate: edt,
  onSelectDates,
}: Props) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={_container}>
          <View style={_headerWrap}>
            <Header
              onClickPrev={onPrev}
              title="목표 날짜를 정하세요"
              desc="꾸준히 실천했을때 목표 달성이 가능한
            실현 가능한 날짜가 좋아요!"
            />
          </View>
          <View style={_wrapper}>
            <Calendar start={sdt} end={edt} setDate={onSelectDates} />
            <RoundSquareButton
              disabled={!sdt || !edt}
              onPress={onNext}
              size="m"
              type={!sdt || !edt ? 'disable' : 'primary'}>
              계속하기 (2/3)
            </RoundSquareButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Step2;

const _container = css`
  width: 100%;
  flex: 1;
`;

const _headerWrap = css`
  width: 100%;
  padding: 0 24px;
`;

const _wrapper = css`
  flex: 1;
  margin-top: 79px;
  padding: 36px 24px 46px;
  justify-content: space-between;
  background-color: #202227;
  width: 100%;
`;
