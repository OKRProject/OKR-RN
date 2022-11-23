import {View, Image} from 'react-native';
import React from 'react';
import {UserProfileType} from '../../../api/user';
import {
  Background,
  Header,
  RoundSquareButton,
  DefaultText as Text,
} from '../../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/main';
import {css} from '@emotion/native';

type Props = UserProfileType;
const Detail = ({profileImage, field, name}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleGoBack = () => navigation.navigate('MyPage');
  const handleClickEditName = () => {};
  const handleClickEditField = () => {};
  return (
    <Background>
      <Header title="프로필 상세" onBack={handleGoBack} />
      <View style={profile}>
        <View style={imageWrap}>
          <Image style={{width: '100%', height: '100%'}} />
        </View>
      </View>
      <View style={buttonsWrap}>
        <RoundSquareButton
          style={button}
          type="dark"
          size="m"
          onPress={handleClickEditName}>
          <View style={buttonContents}>
            <Text style={label}>이름 수정</Text>
            <Text style={content}>{name}</Text>
          </View>
        </RoundSquareButton>
        <RoundSquareButton
          style={button}
          type="dark"
          size="m"
          onPress={handleClickEditField}>
          <View style={buttonContents}>
            <Text style={label}>대표 분야 수정</Text>
            <Text style={content}>{field}</Text>
          </View>
        </RoundSquareButton>
      </View>
    </Background>
  );
};

export default Detail;

const profile = css`
  width: 100px;
  height: 100px;
  position: relative;
  margin: 27px auto 40px;
`;
const imageWrap = css`
  width: 100%;
  height: 100%;
  border-radius: 100px;
  overflow: hidden;
  background-color: #636363;
`;

const buttonsWrap = css`
  margin-top: 40px;
  padding: 0 24px;
`;
const button = css`
  padding: 16px;
  margin-bottom: 16px;
`;

const buttonContents = css`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const label = css`
  font-weight: 500;
  font-size: 16px;
`;
const content = css`
  color: #a9a9a9;
`;
