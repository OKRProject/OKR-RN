import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import React, {useMemo} from 'react';
import {Layout} from '../components';
import {DefaultInput as Input, RoundSquareButton} from '../../../components';
import {css} from '@emotion/native';
import {StepType} from '..';

const desc = `닉네임은 나중에 언제든지 바꿀 수 있어요.
공백없이 8자 이하 사용 가능합니다.`;

type Props = {
  name: string;
  onChange: (name: string) => void;
  nextStep: (step: StepType) => void;
};
const StepName = ({name, onChange, nextStep}: Props) => {
  const validate = useMemo(() => name.length > 1, [name]);
  const handleComplete = () => validate && nextStep('category');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={css`
          flex: 1;
          width: 100%;
        `}>
        <Layout title="닉네임을 입력해주세요" desc={desc}>
          <View style={container}>
            <View
              onStartShouldSetResponder={event => true}
              onTouchEnd={e => {
                e.stopPropagation();
              }}>
              <Input
                autoFocus
                style={input}
                maxLength={8}
                value={name}
                onChangeText={onChange}
                placeholder="nickname"
                hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
              />
            </View>
            <RoundSquareButton
              type={validate ? 'primary' : 'disable'}
              size="m"
              onPress={handleComplete}>
              다음
            </RoundSquareButton>
          </View>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
};
const container = css`
  flex: 1;
  margin-top: 120px;
  align-items: center;
  justify-content: space-between;
`;

const input = css`
  font-weight: 700;
  font-size: 40px;
  color: #fff;
`;
export default StepName;
