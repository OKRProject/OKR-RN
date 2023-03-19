import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  DefaultModal as Modal,
  DefaultText as Text,
  RoundInput,
  RoundSquareButton,
} from '../../../components';
import {css} from '@emotion/native';
import api from '../../../api';
import {debounce} from 'lodash';

type Props = {
  isVisible: boolean;
  projectToken: string;
  onClose: () => void;
  onComplete: () => void;
};
const TeamMemberAddModal = ({
  isVisible,
  onClose,
  projectToken,
  onComplete,
}: Props) => {
  const [email, setEmail] = useState('');
  const [validate, setValidate] = useState(false);

  const validateEmail = debounce(async (email: string) => {
    const email_format =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (email_format.test(email)) {
      try {
        const {data} = await api.project.inviteMemberEmailValidate(
          email,
          projectToken,
        );
        setValidate(true);
      } catch (e: any) {
        console.log(e);
        setValidate(false);
      }
    }
  }, 500);

  const handleClickComplete = async () => {
    try {
      const {data} = await api.project.inviteMember({
        projectToken,
        email,
      });
      onComplete();
    } catch (e: any) {
      console.log(e);
    }
  };

  const debounceEmailValidate = useCallback((value: string) => {
    validateEmail(value);
  }, []);

  const handleChangeInput = (value: string) => {
    setEmail(value);
    debounceEmailValidate(value);
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose} close>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={{height: 500}} behavior="padding">
          <View style={{height: '100%'}}>
            <Text style={title}>팀원 추가하기</Text>
            <View style={inputWrap}>
              <Text style={label}>이메일</Text>
              <RoundInput
                placeholder="이메일 입력"
                value={email}
                onChangeText={handleChangeInput}
              />
              <View style={message}>
                {email.length > 0 && !validate && (
                  <Text style={fail}>이메일 주소가 올바르지 않습니다.</Text>
                )}
                {validate && (
                  <Text style={success}>팀원 추가 가능한 이메일입니다.</Text>
                )}
              </View>
            </View>
            <RoundSquareButton
              style={{marginTop: 'auto'}}
              type={validate ? 'primary' : 'disable'}
              size="m"
              onPress={handleClickComplete}>
              완료
            </RoundSquareButton>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const title = css`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 40px;
`;

const inputWrap = css`
  margin-bottom: 84px;
`;
const label = css`
  margin-bottom: 8px;
`;

const message = css`
  height: 14px;
  margin-top: 8px;
`;
const fail = css`
  font-size: 12px;
  color: #eb4d3d;
`;
const success = css`
  font-size: 12px;
  color: #55ab67;
`;
export default TeamMemberAddModal;
