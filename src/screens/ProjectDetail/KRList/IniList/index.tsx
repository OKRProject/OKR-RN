import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../../../../api';
import {ProjectIniType} from '../../../../api/project';
import {RoundSquareButton} from '../../../../components';
import InitiativeCard from './InitiativeCard';
import IniAdd from '../../IniAdd';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../navigation/main';
import {useNavigation} from '@react-navigation/native';

type NavigationProps = StackNavigationProp<RootStackParamList>;
type Props = {
  keyResultToken: string;
  projectTitle: string;
};
const IniList = ({keyResultToken, projectTitle}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const [iniList, setIniList] = useState<ProjectIniType[]>([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const getIniList = async () => {
    const {data} = await api.project.getIniList({keyResultToken});
    setIniList(data.content);
  };

  const handleAddIni = () => setOpenAdd(true);
  const handleCloseIni = () => {
    setOpenAdd(false);
    getIniList();
  };
  const handleMoveIniDetail = (idx: number) =>
    navigation.navigate('Ini', {
      type: 'detail',
      initiativeToken: iniList[idx].initiativeToken,
      onGoBack: getIniList,
    });

  useEffect(() => {
    getIniList();
  }, [keyResultToken]);

  return (
    <ScrollView>
      {iniList.map((ini, idx) => (
        <InitiativeCard
          {...ini}
          key={`KR${keyResultToken}_${ini.initiativeToken}`}
          onPress={() => handleMoveIniDetail(idx)}
        />
      ))}
      <RoundSquareButton type="primary" size="xl" onPress={handleAddIni}>
        이니셔티브 추가하기
      </RoundSquareButton>
      <IniAdd
        keyResultToken={keyResultToken}
        isVisible={openAdd}
        onClose={handleCloseIni}
        projectTitle={projectTitle}
      />
    </ScrollView>
  );
};

export default IniList;
