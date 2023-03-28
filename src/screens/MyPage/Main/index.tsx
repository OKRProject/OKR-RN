import {Image, Pressable, TouchableOpacity, View} from 'react-native';
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
import query from '../../../query';
import {useSignOut} from '../../../hooks';

type Props = UserProfileType;
const Main = ({name, jobFieldDetail, email, profileImage}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [openModal, setOpenModal] = useState<
    undefined | 'logout' | 'withdrawal'
  >();
  const {mutateAsync: deleteUser} = query.user.useDeleteUser();
  const {signOutUser} = useSignOut();
  const [check, setCheck] = useState<{0: boolean; 1: boolean; 2: boolean}>({
    0: false,
    1: false,
    2: false,
  });
  // console.log(field, name, profileImage, email);

  const handleClickPolicy = () => navigation.navigate('Policy');
  const handleClickTerms = () => navigation.navigate('Terms');
  const handleClickLogout = async () => {
    setOpenModal(undefined);
    signOutUser();
  };

  const handleClickWithdrawalConfirm = async () => {
    setOpenModal(undefined);
    await deleteUser();
  };
  const handleClickWithdrawal = () => setOpenModal('withdrawal');
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
      {openModal === 'withdrawal' && (
        <Modal isVisible={true} onClose={() => setOpenModal(undefined)}>
          <View>
            <Text style={modalTitle}>회원 탈퇴</Text>
            <Pressable
              style={[
                _row,
                css`
                  margin: 32px 0 26px;
                `,
              ]}
              onPress={() => {
                const allTrue = Object.values(check).every(item => item);
                if (allTrue) setCheck({0: false, 1: false, 2: false});
                else setCheck({0: true, 1: true, 2: true});
              }}>
              <View
                style={[
                  _checkIcon,
                  css`
                    margin-right: 10px;
                    width: 20px;
                    height: 20px;
                    border-radius: 10px;
                    background-color: #a9a9a9;
                    align-items: center;
                    justify-content: center;
                  `,
                  ,
                  Object.values(check).every(item => item) &&
                    css`
                      background-color: #1f92f2;
                    `,
                ]}>
                <Icons.Check color={'#1E1E22'} />
              </View>
              <Text style={modalSubtitle}>
                안내사항을 확인하고 회원탈퇴에 동의
              </Text>
            </Pressable>
            <View style={modalDesc}>
              <Pressable
                onPress={() => setCheck(prev => ({...prev, 0: !prev[0]}))}
                style={_row}>
                <View style={_checkIcon}>
                  <Icons.Check color={check[0] ? '#1F92F2' : '#a9a9a9'} />
                </View>
                <Text>연결된 소셜 계정 정보가 삭제됩니다.</Text>
              </Pressable>
              <Pressable
                style={_row}
                onPress={() => setCheck(prev => ({...prev, 1: !prev[1]}))}>
                <View style={_checkIcon}>
                  <Icons.Check color={check[1] ? '#1F92F2' : '#a9a9a9'} />
                </View>
                <Text>회원님의 활동 이력, 개인 정보와 설정이 삭제됩니다.</Text>
              </Pressable>
              <Pressable
                style={_row}
                onPress={() => setCheck(prev => ({...prev, 2: !prev[2]}))}>
                <View style={_checkIcon}>
                  <Icons.Check color={check[2] ? '#1F92F2' : '#a9a9a9'} />
                </View>
                <Text>참여 중인 모든 프로젝트에서 자동 탈퇴됩니다.</Text>
              </Pressable>
            </View>
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
                onPress={handleClickWithdrawalConfirm}>
                탈퇴
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
`;

const modalDesc = css`
  margin-bottom: 42px;
`;

const _row = css`
  flex-direction: row;
  align-items: center;
`;

const _checkIcon = css`
  color: red;
  margin-right: 4px;
`;
export default Main;
