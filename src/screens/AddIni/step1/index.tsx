import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Background,
  DefaultInput,
  Header,
  Icons,
  RoundSquareButton,
  DefaultText as Text,
  InfoToolTip,
} from '../../../components';
import {css} from '@emotion/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/main';

type Props = {
  onNext: () => void;
  onPrev: () => void;
  onChange: ({name, detail}: {name: string; detail: string}) => void;
  route: RouteProp<RootStackParamList, 'AddIni'>;
  initial: {name: string; detail: string};
};

const Step1 = ({onChange, onPrev, onNext, route, initial}: Props) => {
  const keyResultName = route.params.keyResultName;
  const [keyboardFocused, setKeyboardFocused] = useState<boolean>(false);
  const [name, setName] = useState(initial.name);
  const [detail, setDetail] = useState(initial.detail);

  const handleClickNextButton = () => {
    onChange({name, detail});
    onNext();
  };
  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={container}>
          <Header onBack={onPrev} title="새 행동전략" />
          <View style={_contentWrap}>
            <View style={_card}>
              <Text style={_label}>핵심 결과</Text>
              <Text style={_kr}>{keyResultName}</Text>
            </View>
            <KeyboardAvoidingView style={_wrapper} behavior="padding">
              <View
                style={css`
                  flex-direction: row;
                  margin-bottom: 8px;
                  align-items: center;
                  z-index: 999;
                `}>
                <Text style={_title}>행동 전략</Text>
                <InfoToolTip>
                  <View
                    style={css`
                      width: 233px;
                      height: 60px;
                    `}>
                    <Text>
                      목표를 이루기위해 해야하는 핵심적인 행동입니다. 개인이
                      제어할 수 있는 일들을 적어주세요!
                    </Text>
                  </View>
                </InfoToolTip>
              </View>
              <DefaultInput
                placeholder="1분기 까지 서비스 이용자 10만명"
                style={_input}
                onFocus={() => setKeyboardFocused(true)}
                onBlur={() => setKeyboardFocused(false)}
                value={name}
                onChangeText={t => setName(t)}
                maxLength={20}
              />
              <View
                style={[
                  _card,
                  css`
                    width: 100%;
                    margin-top: 24px;
                  `,
                ]}>
                <DefaultInput
                  style={[
                    _label,
                    css`
                      min-height: 107px;
                    `,
                  ]}
                  value={detail}
                  placeholder="세부적인 행동전략 실행 방법을 입력해 주세요."
                  onFocus={() => setKeyboardFocused(true)}
                  onBlur={() => setKeyboardFocused(false)}
                  onChangeText={t => setDetail(t)}
                  maxLength={200}
                  multiline
                />
              </View>
              <RoundSquareButton
                disabled={name.length === 0 || detail.length === 0}
                onPress={handleClickNextButton}
                size="m"
                type={
                  name.length === 0 || detail.length === 0
                    ? 'disable'
                    : 'primary'
                }
                style={[
                  css`
                    margin-top: auto;
                  `,
                  keyboardFocused &&
                    css`
                      margin-bottom: 16px;
                    `,
                ]}>
                계속하기
              </RoundSquareButton>
            </KeyboardAvoidingView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

export default Step1;

const container = css`
  flex: 1;
  padding: 0px;
  background-color: #18181b;
  width: 100%;
  margin-left: auto;
`;

const _card = css`
  flex-direction: row;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #202227;

  /* width: fit-content; */
`;
const _label = css`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #616166;
`;

const _kr = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-left: 6px;
`;

const _contentWrap = css`
  padding: 24px;
  width: 100%;
  flex: 1;
  align-items: flex-start;
`;
const _title = css`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #616166;
  margin-right: 8px;
`;

const _wrapper = css`
  flex: 1;
  margin-top: 28px;
  /* justify-content: space-between; */
  width: 100%;
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
