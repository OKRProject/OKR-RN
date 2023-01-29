import {Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Background,
  Header,
  DefaultText as Text,
  RoundSquareButton,
  Icons,
  DefaultModal as Modal,
} from '../../../components';

import {css} from '@emotion/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/main';
import {UserProfileType} from '../../../api/user';
import {useSignOut} from '../../../hooks';

type Props = UserProfileType;
const Main = ({name, jobFieldDetail, email, profileImage}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [openModal, setOpenModal] = useState<
    undefined | 'edit' | 'logout' | 'withdrawal'
  >();
  const {signOutUser} = useSignOut();
  // console.log(field, name, profileImage, email);

  const handleClickPolicy = () => navigation.navigate('Policy');
  const handleClickTerms = () => navigation.navigate('Terms');
  const handleClickLogout = () => {
    setOpenModal(undefined);
    setTimeout(() => {
      signOutUser();
    }, 500);
  };
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
            <Image
              source={{uri: profileImage}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View>
            <Text style={profileName}>{name}</Text>
            <Text style={profileField}>{jobFieldDetail}</Text>
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
            onPress={() => setOpenModal('logout')}>
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
      {openModal === 'logout' && (
        <Modal isVisible={true} onClose={() => setOpenModal(undefined)}>
          <View>
            <Text style={modalTitle}>로그아웃</Text>
            <Text style={modalSubtitle}>로그아웃 하시겠어요?</Text>
            <View style={[rowFlex]}>
              <RoundSquareButton
                type="dark"
                size="m"
                style={[smallButton, firstButton]}
                onPress={() => setOpenModal(undefined)}>
                취소
              </RoundSquareButton>
              <RoundSquareButton
                type="primary"
                size="m"
                style={[smallButton]}
                onPress={handleClickLogout}>
                로그아웃
              </RoundSquareButton>
            </View>
          </View>
        </Modal>
      )}
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

const rowFlex = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

const smallButton = css`
  flex: 1;
  min-width: 0;
`;

const firstButton = css`
  margin-right: 8px;
  border: 1px solid #35353a;
`;

const modalTitle = css`
  font-weight: 600;
  font-size: 24px;
`;

const modalSubtitle = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin: 32px 0 40px;
`;
export default Main;
