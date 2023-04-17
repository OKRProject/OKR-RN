import {View, Image} from 'react-native';
import React, {useState} from 'react';
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
import EditName from './EditName';
import EditField from './EditField';

type Props = UserProfileType;
const Detail = ({profileImage, jobFieldDetail, fieldCategory, name}: Props) => {
  const [openModal, setOpenModal] = useState<'name' | 'field' | undefined>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleGoBack = () => navigation.navigate('MyPage');
  const handleClickEditName = () => setOpenModal('name');
  const handleClickEditField = () => setOpenModal('field');

  return (
    <Background>
      <Header title="프로필 상세" onBack={handleGoBack} />
      <View style={profile}>
        <View style={imageWrap}>
          <Image
            source={{uri: profileImage}}
            style={{width: '100%', height: '100%'}}
          />
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
            <Text style={content}>{jobFieldDetail}</Text>
          </View>
        </RoundSquareButton>
      </View>
      <EditName
        _name={name}
        isVisible={openModal === 'name'}
        onClose={() => setOpenModal(undefined)}
      />
      <EditField
        _field={jobFieldDetail}
        _category={fieldCategory}
        isVisible={openModal === 'field'}
        onClose={() => setOpenModal(undefined)}
      />
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
