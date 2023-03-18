import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DefaultText as Text} from '../../../../components';
import InitiativeCard from './InitiativeCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../navigation/main';
import {useNavigation} from '@react-navigation/native';
import {css} from '@emotion/native';
import useGetIniList from '../../../../query/project/useGetIniList';

type NavigationProps = StackNavigationProp<RootStackParamList>;
type Props = {
  KRToken: string;
  KRTitle: string;
  projectToken: string;
};
const IniList = ({KRToken, KRTitle, projectToken}: Props) => {
  const navigation = useNavigation<NavigationProps>();

  const {data: iniList} = useGetIniList({keyResultToken: KRToken});

  const handleAddIni = () =>
    navigation.navigate('AddIni', {
      keyResultName: KRTitle,
      keyResultToken: KRToken,
      projectToken,
    });

  return (
    <View style={_container}>
      {iniList?.data?.content.map((ini, idx) => (
        <InitiativeCard
          {...ini}
          key={`KR${KRToken}_${ini.initiativeToken}`}
          keyResultToken={KRToken}
        />
      ))}
      <TouchableOpacity onPress={handleAddIni}>
        <Text style={_addButtonText}>+ 행동전략 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

const _container = css`
  padding: 24px 24px 34px;
`;

const _addButtonText = css`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #1f92f2;
`;

export default IniList;
