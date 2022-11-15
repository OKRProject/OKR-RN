import {View} from 'react-native';
import React, {useMemo} from 'react';
import {ProjectIniType} from '../../../api/project';
import {css} from '@emotion/native';
import {DefaultText as Text, RoundSquareButton} from '../../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/main';

type Props = ProjectIniType;
const Description = (data: Props) => {
  const {iniDetail, user, myInitiative, done} = useMemo(() => data, [data]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleWriteFeedback = () => {
    navigation.navigate('Ini', {type: 'feedback', data});
  };
  return (
    <View style={container}>
      <View style={flex}>
        <View style={userProfile} />
        <Text style={userName}>{user.userName}</Text>
      </View>
      <Text style={desc}>{iniDetail}</Text>
      <View style={flex}>
        {
          /* !myInitiative && done && !wroteFeedback  */ true ? (
            <RoundSquareButton
              type="primary"
              size="m"
              onPress={handleWriteFeedback}>
              피드백하기
            </RoundSquareButton>
          ) : myInitiative && !done ? (
            <>
              <RoundSquareButton type="secondary" size="m" style={halfButton}>
                수정하기
              </RoundSquareButton>
              <RoundSquareButton
                type="primary"
                size="m"
                style={[secondButton, halfButton]}>
                완료하기
              </RoundSquareButton>
            </>
          ) : (
            <RoundSquareButton type="secondary" size="m">
              완료됨
            </RoundSquareButton>
          )
        }
      </View>
    </View>
  );
};

const container = css`
  background-color: #1e1e22;
  padding: 29px 32px;
`;

const flex = css`
  flex-direction: row;
  align-items: center;
`;

const userProfile = css`
  width: 24px;
  height: 24px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #999;
  margin-right: 8px;
`;

const userName = css`
  color: #a9a9a9;
  font-size: 16px;
`;

const desc = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  margin: 18px 0;
`;

const halfButton = css`
  flex: 1;
  min-width: 0;
`;

const secondButton = css`
  margin-left: 10px;
`;
export default Description;
