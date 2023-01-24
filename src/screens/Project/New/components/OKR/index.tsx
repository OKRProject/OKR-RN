import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {
  RoundInput,
  RoundSquareButton,
  DefaultText as Text,
} from '../../../../../components';
import {NewProjectType} from '../..';
import produce from 'immer';
import {css} from '@emotion/native';

type OkrType = Pick<NewProjectType, 'objective' | 'krList'>;
type Props = OkrType & {
  setProject: Dispatch<SetStateAction<NewProjectType>>;
};
const OKR = ({objective, krList, setProject}: Props) => {
  const handleChangeObject = (objective: string) =>
    setProject(prev => ({...prev, objective}));
  const handleChangeKr = (idx: number, kr: string) =>
    setProject(
      produce(draft => {
        draft.krList[idx] = kr;
      }),
    );
  const handleDeleteKr = (index: number) =>
    setProject(prev => ({
      ...prev,
      krList: prev.krList.filter((_, idx) => idx !== index),
    }));
  const handleAddKr = () =>
    setProject(prev => ({...prev, krList: [...prev.krList, '']}));

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={okrWrap} behavior="padding">
        <View style={objectWrap}>
          <Text style={okrTitle}>목표(O)</Text>
          <RoundInput
            placeholder="1년안에 마라톤 풀코스 완주하자!!"
            value={objective}
            onChangeText={handleChangeObject}
          />
        </View>
        <TouchableWithoutFeedback>
          <View style={krWrap}>
            <Text style={okrTitle}>핵심 결과(KR)</Text>
            {krList.map((kr, idx) => {
              const onChange = (text: string) => handleChangeKr(idx, text);
              const onDelete =
                idx !== 0 ? () => handleDeleteKr(idx) : undefined;
              return (
                <RoundInput
                  placeholder="1km 당 페이스 5’00으로 늘리기"
                  style={krInput}
                  value={kr}
                  key={`new_project_kr${idx}`}
                  onDelete={onDelete}
                  onChangeText={onChange}
                />
              );
            })}
            {krList.length < 3 && (
              <RoundSquareButton type="primary" size="s" onPress={handleAddKr}>
                KR 추가하기
              </RoundSquareButton>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const okrWrap = css`
  flex: 1;
  background-color: #1e1e22;
  padding: 21px 27px;
`;

const objectWrap = css`
  width: 100%;
  padding: 16px 0;
`;
const krWrap = css`
  width: 100%;
  padding: 3px 0;
`;

const okrTitle = css`
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 11px;
  margin-left: 8px;
`;

const krInput = css`
  margin-bottom: 12px;
`;

export default OKR;
