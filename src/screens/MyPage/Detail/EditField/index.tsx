import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {
  DefaultModal as Modal,
  DefaultText as Text,
  RoundSquareButton,
  Icons,
} from '../../../../components';
import {css} from '@emotion/native';

type Props = {
  _field: string;
  onClose: () => void;
  isVisible: boolean;
};
const EditField = ({_field, ...rest}: Props) => {
  const [field, setField] = useState<string>(_field);

  const handleClickSave = () => {};
  return (
    <Modal {...rest} close>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Text style={_title}>대표 분야를 선택해 주세요</Text>
          <RoundSquareButton size="m" type="dark" style={_fieldButton}>
            <Text style={_text}>1차 카테고리</Text>
            <View style={_icon}>
              <Icons.Back />
            </View>
          </RoundSquareButton>
          <RoundSquareButton size="m" type="dark" style={_fieldButton}>
            <Text style={_text}>{field}</Text>
            <View style={_icon}>
              <Icons.Back />
            </View>
          </RoundSquareButton>
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

const _button = css`
  margin-top: 320px;
`;

const _fieldButton = css`
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const _icon = css`
  width: 16px;
  height: 16px;
  transform: rotate(270deg);
`;

const _text = css`
  font-size: 18px;
`;
export default EditField;
