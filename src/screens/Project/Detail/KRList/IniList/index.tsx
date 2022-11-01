import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../../../../../api';
import {ProjectIniType} from '../../../../../api/project';
import {RoundSquareButton} from '../../../../../components';
import InitiativeCard from './InitiativeCard';
import IniAdd from '../../IniAdd';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../navigation/main';
import {useNavigation} from '@react-navigation/native';

type NavigationProps = StackNavigationProp<RootStackParamList>;
type Props = {
  KRId: number;
  projectTitle: string;
};
const IniList = ({KRId, projectTitle}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const [iniList, setIniList] = useState<ProjectIniType[]>([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const getIniList = async () => {
    const {data} = await api.project.getIniList({KRId});
    setIniList(data.content);
  };

  const handleAddIni = () => setOpenAdd(true);
  const handleCloseIni = () => setOpenAdd(false);
  const handleMoveIniDetail = (idx: number) =>
    navigation.navigate('Ini', {
      type: 'detail',
      data: iniList[idx],
      title: `${projectTitle}-KR${KRId}`,
    });

  useEffect(() => {
    getIniList();
  }, [KRId]);

  return (
    <ScrollView>
      {iniList.map((ini, idx) => (
        <InitiativeCard
          key={`KR${KRId}_${ini.iniSeq}`}
          {...ini}
          onPress={() => handleMoveIniDetail(idx)}
        />
      ))}
      <RoundSquareButton type="primary" size="xl" onPress={handleAddIni}>
        이니셔티브 추가하기
      </RoundSquareButton>
      <IniAdd KRId={KRId} isVisible={openAdd} onClose={handleCloseIni} />
    </ScrollView>
  );
};

export default IniList;
