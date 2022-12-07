import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Background,
  Header,
  DefaultText as Text,
  RoundSquareButton,
  Icons,
} from '../../../components';
import userStore from '../../../store/userStore';
import {css} from '@emotion/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/main';
import {UserProfileType} from '../../../api/user';

type Props = UserProfileType;
const Main = ({name, field, email, profileImage}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // console.log(field, name, profileImage, email);

  const handleClickPolicy = () => navigation.navigate('Policy');
  const handleClickTerms = () => navigation.navigate('Terms');
  const handleClickLogout = () => {};
  const handleClickWithdrawal = () => {};
  const handleClickProfileDetail = () =>
    navigation.navigate('MyPage', {
      type: 'detail',
    });
  return (
    <Background>
      <Header title="My" />
      <View style={container}>
        <TouchableOpacity style={profile} onPress={handleClickProfileDetail}>
          <View style={img}>
            <Image source={{uri: profileImage}} style={{width: '100%', height:"100%"}} />
          </View>
          <View>
            <Text style={profileName}>{name}</Text>
            <Text style={profileField}>{field}</Text>
            <Text style={profileEmail}>{email}</Text>
          </View>
          <View style={rotate}>
            <Icons.Back />
          </View>
        </TouchableOpacity>
        <View style={buttonsWrap}>
          <RoundSquareButton
            style={button}
            type="dark"
            size="m"
            onPress={handleClickPolicy}>
            개인정보처리방침
          </RoundSquareButton>
          <RoundSquareButton
            style={button}
            type="dark"
            size="m"
            onPress={handleClickTerms}>
            서비스이용약관
          </RoundSquareButton>
          <RoundSquareButton
            style={button}
            type="dark"
            size="m"
            onPress={handleClickLogout}>
            로그아웃
          </RoundSquareButton>
          <RoundSquareButton
            style={button}
            type="dark"
            size="m"
            onPress={handleClickWithdrawal}>
            회원탈퇴
          </RoundSquareButton>
        </View>
      </View>
    </Background>
  );
};

const container = css`
  padding: 11px 24px;
`;

const profile = css`
  flex-direction: row;
  align-items: center;
`;

const img = css`
  width: 72px;
  height: 72px;
  background-color: gray;
  border-radius: 72px;
  overflow: hidden;
  margin-right: 14px;
`;

const profileName = css`
  font-size: 24px;
  font-weight: 600;
`;

const profileField = css`
  font-size: 12px;
`;
const profileEmail = css`
  font-size: 12px;
  color: #a9a9a9;
`;
const buttonsWrap = css`
  margin-top: 40px;
`;
const button = css`
  padding: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
`;
const rotate = css`
  width: 24px;
  height: 24px;
  transform: rotate(180deg);
  margin-left: auto;
`;

export default Main;
