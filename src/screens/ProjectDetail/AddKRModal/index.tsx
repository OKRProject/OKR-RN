import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import {css} from '@emotion/native';
import {
  DefaultInput,
  DefaultText as Text,
  Icons,
  RoundSquareButton,
} from '../../../components';

import api from '../../../api';

type Props = Partial<ModalProps> & {
  onClickClose: () => void;

  projectToken: string;
};
const AddKRModal = ({
  onClickClose,

  projectToken,

  ...rest
}: Props) => {
  const [keyboardFocused, setKeyboardFocused] = useState<boolean>(false);
  const [kr, setKr] = useState('');

  const handleChangeKr = (text: string) => setKr(text);
  return (
    <Modal {...rest} style={background} hasBackdrop={false} backdropOpacity={1}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={container}>
          <TouchableWithoutFeedback onPress={onClickClose}>
            <View style={menuButton}>
              <Icons.Back />
            </View>
          </TouchableWithoutFeedback>
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
              onPress={() => {}}
              size="m"
              type={kr.length === 0 ? 'disable' : 'primary'}
              style={[
                css``,
                keyboardFocused &&
                  css`
                    margin-bottom: 16px;
                  `,
              ]}>
              추가하기
            </RoundSquareButton>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddKRModal;
const background = css`
  margin: -24px 0;
`;

const container = css`
  height: 100%;
  padding: 82px 24px 40px 24px;
  background-color: #18181b;
  width: 100%;
  margin-left: auto;
`;

const menuButton = css`
  width: 24px;
  height: 24px;
  margin-bottom: 47px;
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
  margin-bottom: 29px;
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
