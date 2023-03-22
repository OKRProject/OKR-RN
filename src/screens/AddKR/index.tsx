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
} from '../../components';
import {css} from '@emotion/native';
import {RootStackParamList} from '../../navigation/main';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import query from '../../query';
interface Props extends NativeStackScreenProps<RootStackParamList, 'AddKR'> {}

const AddKR = ({navigation, route}: Props) => {
  const [keyboardFocused, setKeyboardFocused] = useState<boolean>(false);
  const [kr, setKr] = useState('');
  const projectToken = route.params.projectToken;

  const {mutateAsync} = query.project.useAddKR({projectToken});
  const handleChangeKr = (text: string) => setKr(text);
  const handleAddKR = async () => {
    try {
      await mutateAsync({projectToken, keyResultName: kr});
      navigation.navigate('ProjectDetail', {projectToken});
    } catch (e) {}
  };
  return (
    <Background>
      <Header onBack={() => navigation.goBack()} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={container}>
          <View>
            <Text style={_title}>핵심 결과(KR)를 입력해 주세요</Text>
            <Text style={_desc}>
              목표를 달성하기 위해 필요한 성과를 적어주세요
            </Text>
            <Text style={_desc}>
              구체적이고 정량적인 수치로 적을수록 좋아요!
            </Text>
          </View>
          <KeyboardAvoidingView style={_wrapper} behavior="padding">
            <DefaultInput
              placeholder="1분기 까지 서비스 이용자 10만명"
              style={_input}
              onFocus={() => setKeyboardFocused(true)}
              onBlur={() => setKeyboardFocused(false)}
              value={kr}
              onChangeText={handleChangeKr}
            />
            <RoundSquareButton
              disabled={kr.length === 0}
              onPress={handleAddKR}
              size="m"
              type={kr.length === 0 ? 'disable' : 'primary'}
              style={[
                css``,
                keyboardFocused &&
                  css`
                    margin-bottom: 120px;
                  `,
              ]}>
              추가하기
            </RoundSquareButton>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

export default AddKR;

const container = css`
  flex: 1;
  padding: 0px;
  background-color: #18181b;
  width: 100%;
  margin-left: auto;
  padding: 24px;
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
