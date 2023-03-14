import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {css} from '@emotion/native';
import {Header} from '../components';
import {
  DefaultInput,
  Icons,
  RoundSquareButton,
  DefaultText as Text,
} from '../../../components';
import {debounce} from 'lodash';
import api from '../../../api';

type Props = {
  onPrev: () => void;
  onComplete: (members: string[]) => void;
};
const Step3 = ({onPrev, onComplete}: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [keyboardFocused, setKeyboardFocused] = useState<boolean>(false);
  const [members, setMembers] = useState<string[]>([]);

  const validateEmail = debounce(async (email: string) => {
    const email_format =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (email_format.test(email)) {
      try {
        //todo api
        setMembers(prev => [...prev, inputValue]);
        setInputValue('');
      } catch (e: any) {
        console.log(e);
      }
    }
  }, 500);

  const handleAddMember = () => {
    validateEmail(inputValue);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={_container}>
          <Header
            onClickPrev={onPrev}
            title="함께할 팀원을 추가해보세요"
            desc="목표를 함께 달성해 나갈 팀원의 
            메일 주소를 입력해주세요!"
          />
          <KeyboardAvoidingView style={_wrapper} behavior="padding">
            <View>
              <View style={_inputWrap}>
                <DefaultInput
                  placeholder=" OKRexample@example.com"
                  style={_input}
                  onFocus={() => setKeyboardFocused(true)}
                  onBlur={() => setKeyboardFocused(false)}
                  value={inputValue}
                  onChangeText={value => setInputValue(value)}
                />
                <TouchableOpacity
                  onPress={handleAddMember}
                  style={css`
                    width: 20px;
                    height: 20px;
                  `}>
                  <Icons.Plus color={inputValue ? '#1F92F2' : '#616166'} />
                </TouchableOpacity>
              </View>
              <View style={_membersWrap}>
                {members.map((email, idx) => (
                  <View key={`member_${email}_${idx}`} style={_member}>
                    <Text style={_email}>{email}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setMembers(prev =>
                          prev.filter(member => member !== email),
                        )
                      }
                      style={css`
                        width: 16px;
                        height: 16px;
                      `}>
                      <Icons.Close color="#616166" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            <RoundSquareButton
              onPress={() => onComplete(members)}
              size="m"
              type={'primary'}
              style={[
                css``,
                keyboardFocused &&
                  css`
                    margin-bottom: 72px;
                  `,
              ]}>
              완료하기 (3/3)
            </RoundSquareButton>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Step3;

const _container = css`
  padding: 0 24px 36px 24px;
  width: 100%;
  flex: 1;
  justify-content: flex-start;
`;

const _wrapper = css`
  flex: 1;
  margin-top: 56px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const _inputWrap = css`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;
  border: 0px solid #fff;
  border-bottom-width: 2px;
`;

const _input = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  flex: 1;
`;

const _membersWrap = css`
  align-items: flex-start;
  margin-top: 18px;
`;
const _member = css`
  padding: 4px 8px 4px 12px;
  background: #202227;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const _email = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 26px;
  margin-right: 2px;
`;
