import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {
  DefaultModal as Modal,
  RoundInput,
  DefaultText as Text,
  RoundSquareButton,
} from '../../../../components';
import {css} from '@emotion/native';

type Props = {
  _name: string;
  onClose: () => void;
  isVisible: boolean;
};
const EditName = ({_name, ...rest}: Props) => {
  const [name, setName] = useState<string>(_name);

  const handleClickSave = () => {};
  return (
    <Modal {...rest} close>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Text style={_title}>이름을 입력해 주세요</Text>
          <RoundInput
            placeholder="이름"
            value={name}
            style={_input}
            containerStyle={_inputWrap}
            onChangeText={v => setName(v)}
          />
          <Text>이름은 공백 없이 8자 이하로 사용 가능합니다.</Text>
          <RoundSquareButton
            size="m"
            type="primary"
            style={_button}
            onPress={handleClickSave}>
            변경사항 저장
          </RoundSquareButton>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const _title = css`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  color: #fff;
  margin-bottom: 40px;
`;

const _inputWrap = css`
  margin-bottom: 8px;
`;
const _input = css`
  font-size: 18px;
`;
const _button = css`
  margin-top: 113px;
`;
export default EditName;
