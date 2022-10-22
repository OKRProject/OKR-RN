import {View} from 'react-native';
import {css} from '@emotion/native';
import React, {useState} from 'react';
import {
  DefaultModal as Modal,
  DefaultText as Text,
  RoundCard,
  RoundInput,
  RoundSquareButton,
} from '../../../../components';
import {DefaultModalProps} from '../../../../components/DefaultModal';
import {AddProjectIniReqType} from '../../../../api/project';

type Props = DefaultModalProps & {
  KRId: number;
};
const IniAdd = ({KRId, ...rest}: Props) => {
  const [initiative, setInitiative] = useState<AddProjectIniReqType>({
    keyResultId: KRId,
    name: '',
    edt: '',
    detail: '',
  });

  const handleCompleteNewAdd = async () => {};

  return (
    <Modal {...rest}>
      <View style={inputWrap}>
        <Text style={label}>이니셔티브 (Ini)</Text>
        <RoundInput
          placeholder="매일 공원 3km씩 달리기"
          value={initiative.name}
        />
      </View>
      <View style={inputWrap}>
        <Text style={label}>상세내용</Text>
        <RoundInput value={initiative.detail} style={desc} />
      </View>
      <View style={inputWrap}>
        <Text style={label}>마감일</Text>
        <RoundCard style={roundBox}>
          <Text>00년 00월 00일 - 00년 00월 00일</Text>
        </RoundCard>
      </View>
      <RoundSquareButton
        style={button}
        type="primary"
        size="xl"
        onPress={handleCompleteNewAdd}>
        이니셔티브 작성 완료
      </RoundSquareButton>
    </Modal>
  );
};

const inputWrap = css`
  margin-top: 25px;
`;

const label = css`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const roundBox = css`
  padding: 16px 17px;
`;

const button = css`
  margin-top: 55px;
`;

const desc = css`
  min-height: 160px;
`;

export default IniAdd;
