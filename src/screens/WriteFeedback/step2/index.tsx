import {View, Text, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {RoundInput, RoundSquareButton} from '../../../components';
import {css} from '@emotion/native';

type Props = {
  opinion: string;
  onChange: (t: string) => void;
  onComplete: () => void;
};
const Step2 = ({opinion, onChange, onComplete}: Props) => {
  return (
    <KeyboardAvoidingView style={container} behavior="padding">
      <RoundInput
        multiline
        value={opinion}
        containerStyle={feedbackInput}
        onChangeText={onChange}
        placeholder="동료의 성장을 위한 피드백을 작성해 주세요"
      />
      <RoundSquareButton
        style={css`
          margin-bottom: 32px;
        `}
        type={opinion.length === 0 ? 'secondary' : 'primary'}
        size="m"
        disabled={opinion.length === 0}
        onPress={onComplete}>
        작성 완료
      </RoundSquareButton>
    </KeyboardAvoidingView>
  );
};

const container = css`
  flex: 1;
  background: #1e1e22;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 28px 24px;
  justify-content: space-between;
`;

const feedbackInput = css`
  height: 162px;
  padding: 14px;
  border-color: transparent;
`;

export default Step2;
