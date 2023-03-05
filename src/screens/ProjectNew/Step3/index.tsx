import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {Header} from '../components';
import {NewProjectType} from '..';
import {RoundSquareButton} from '../../../components';

type Props = {
  onChangeTitle: (title: string) => void;
  onNext: () => void;
  onPrev: () => void;
};
const Step3 = ({onPrev, onNext}: Props) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={_container}>
          <Header
            onClickPrev={onPrev}
            title="함께할 팀원을 추가해보세요"
            desc="목표를 함께 달성해 나갈 팀원의 
            메일 주소를 입력해주세요!"
          />
          <View>
            <RoundSquareButton onPress={onNext} size="m" type={'primary'}>
              완료하기 (3/3)
            </RoundSquareButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Step3;

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
