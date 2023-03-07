import React, {useMemo, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Header} from '../components';
import {NewProjectType} from '..';
import {css} from '@emotion/native';
import {DefaultInput, RoundSquareButton} from '../../../components';

type Props = Pick<NewProjectType, 'title'> & {
  onChangeTitle: (title: string) => void;
  onNext: () => void;
  onPrev: () => void;
};

const Step1 = ({title, onChangeTitle, onPrev, onNext}: Props) => {
  const [keyboardFocused, setKeyboardFocused] = useState<boolean>(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={_container}>
          <Header
            onClickPrev={onPrev}
            title="목표(O)를 입력해 주세요"
            desc="동기 부여를 할수있는 가슴뛰는 목표나 도전적인 문구가 좋아요!"
          />
          <KeyboardAvoidingView style={_wrapper} behavior="padding">
            <DefaultInput
              placeholder="기존에 없는 새로운 서비스 만들기!"
              style={_input}
              onFocus={() => setKeyboardFocused(true)}
              onBlur={() => setKeyboardFocused(false)}
              value={title}
              onChangeText={onChangeTitle}
            />
            <RoundSquareButton
              disabled={title.length === 0}
              onPress={onNext}
              size="m"
              type={title.length === 0 ? 'disable' : 'primary'}
              style={[
                css``,
                keyboardFocused &&
                  css`
                    margin-bottom: 72px;
                  `,
              ]}>
              계속하기 (1/3)
            </RoundSquareButton>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const _container = css`
  padding: 0 24px 36px 24px;
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

const _input = css`
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  padding-bottom: 16px;
  width: 100%;
  border: 0px solid #fff;
  border-bottom-width: 2px;
`;

export default Step1;
