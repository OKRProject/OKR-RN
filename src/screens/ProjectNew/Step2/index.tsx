import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {Header} from '../components';
import {NewProjectType} from '..';
import {RoundSquareButton} from '../../../components';

type Props = Pick<NewProjectType, 'startDt' | 'endDt'> & {
  onChangeTitle: (title: string) => void;
  onNext: () => void;
  onPrev: () => void;
};
const Step2 = ({onPrev, onNext, startDt, endDt}: Props) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={_container}>
          <Header
            onClickPrev={onPrev}
            title="목표 날짜를 정하세요"
            desc="꾸준히 실천했을때 목표 달성이 가능한
            실현 가능한 날짜가 좋아요!"
          />
          <View>
            <RoundSquareButton
              disabled={!startDt || !endDt}
              onPress={onNext}
              size="m"
              type={!startDt || !endDt ? 'disable' : 'primary'}>
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
  padding: 0 24px;
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

const _wrapper = css`
  flex: 1;
  margin-top: 79px;
  justify-content: space-between;
  margin-bottom: 10px;
`;
