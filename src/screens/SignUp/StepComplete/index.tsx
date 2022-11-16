import {Image, View} from 'react-native';
import React from 'react';
import userStore from '../../../store/userStore';
import {DefaultText as Text, RoundSquareButton} from '../../../components';
import {css} from '@emotion/native';
import {UserProfileType} from '../../../api/user';

type Props = {profile: UserProfileType};
const StepComplete = ({profile}: Props) => {
  const {setUserProfile} = userStore();
  const handleClickComplete = () => {
    setUserProfile(profile);
  };
  return (
    <View style={container}>
      <View>
        <Text style={nameTitle}>{profile.name}, 환영해요!</Text>
        <Text style={desc}>가입이 완료되었습니다.</Text>
        <Text style={desc}>
          이제 모아에서 성공적인 프로젝트 경험을 만들어보세요!
        </Text>
        <Text style={desc}>확인 버튼을 선택하시면 메인으로 이동합니다.</Text>
      </View>
      <Image
        style={{height: 166, width: 134, marginBottom: 80}}
        source={require('../../../img/congratulation.png')}
      />
      <RoundSquareButton type="primary" size="m" onPress={handleClickComplete}>
        완료
      </RoundSquareButton>
    </View>
  );
};

export default StepComplete;
const container = css`
  flex: 1;
  justify-content: space-between;
`;
const nameTitle = css`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
`;

const desc = css`
  color: #a9a9a9;
`;
