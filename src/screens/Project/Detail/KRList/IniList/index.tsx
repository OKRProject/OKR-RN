import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../../../../../api';
import {ProjectIniType} from '../../../../../api/project';
import {RoundSquareButton} from '../../../../../components';
import InitiativeCard from './InitiativeCard';
import IniAdd from '../../IniAdd';

type Props = {
  KRId: number;
};
const IniList = ({KRId}: Props) => {
  const [iniList, setIniList] = useState<ProjectIniType[]>([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const getIniList = async () => {
    const {data} = await api.project.getIniList({KRId});
    setIniList(data.content);
  };

  const handleAddIni = () => setOpenAdd(true);
  const handleCloseIni = () => setOpenAdd(false);

  useEffect(() => {
    getIniList();
  }, [KRId]);

  return (
    <ScrollView>
      {iniList.map((ini, idx) => (
        <InitiativeCard key={`KR${KRId}_${ini.iniSeq}`} {...ini} />
      ))}
      <RoundSquareButton type="primary" size="xl" onPress={handleAddIni}>
        이니셔티브 추가하기
      </RoundSquareButton>
      <IniAdd KRId={KRId} isVisible={openAdd} onClose={handleCloseIni} />
    </ScrollView>
  );
};

export default IniList;
