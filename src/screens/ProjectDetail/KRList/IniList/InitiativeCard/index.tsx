import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {DefaultText as Text} from '../../../../../components';
import {css} from '@emotion/native';
import {KeyResultType, ProjectIniType} from '../../../../../api/project';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../navigation/main';

type NavigationProps = StackNavigationProp<RootStackParamList>;
type Props = ProjectIniType & Pick<KeyResultType, 'keyResultToken'>;
const InitiativeCard = ({
  initiativeName,
  user,
  done,
  initiativeToken,
  keyResultToken,
}: Props) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Ini', {initiativeToken, keyResultToken})
      }>
      <View style={_container}>
        <Text style={_title}>{initiativeName}</Text>
        <View style={_contents}>
          <View
            style={css`
              flex-direction: row;
              align-items: center;
            `}>
            <View style={_imgWrap}>
              <Image
                source={{uri: user.profileImage}}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View>
              <Text style={_name}>{user.userName}</Text>
              <Text style={_field}>{user.userName}</Text>
            </View>
          </View>
          <View style={_tagWrap}>
            <Text style={_tag}>{done ? '완료됨' : '진행중'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const _container = css`
  padding-bottom: 20px;
  margin-bottom: 14px;
  border: 0px solid #35353a;
  border-bottom-width: 1px;
  width: 100%;
`;

const _title = css`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
`;

const _contents = css`
  margin-top: 12px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const _name = css`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const _field = css`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #616166;
`;

const _tagWrap = css`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #616166;
`;

const _tag = css`
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
`;

const _imgWrap = css`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  overflow: hidden;
  margin-right: 6px;
`;
export default InitiativeCard;
