import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProjectIniType} from '../../../api/project';
import {css} from '@emotion/native';
import {DefaultText as Text, Icons} from '../../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/main';

type Props = {
  iniList: ProjectIniType[];
  onClick: (date: {start: string; end: string}) => void;
  selectedDate: string;
  date?: {startDt: string; endDt: string};
};
const ProjectIniList = ({iniList, onClick, selectedDate}: Props) => {
  const [selectedIni, setSelectedIni] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleClickIni = (iniInfo: ProjectIniType) => {
    const id = `${iniInfo.projectToken}-${iniInfo.keyResultToken}-${iniInfo.initiativeToken}`;
    if (selectedIni === id)
      return navigation.navigate('Ini', {
        type: 'detail',
        initiativeToken: iniInfo.initiativeToken,
      });

    setSelectedIni(id);
    onClick({start: iniInfo.startDate, end: iniInfo.endDate});
  };

  useEffect(() => {
    setSelectedIni('');
  }, [selectedDate]);

  return (
    <View style={container}>
      {iniList.map(ini => {
        const onPress = () => handleClickIni(ini);
        const id = `${ini.projectToken}-${ini.keyResultToken}-${ini.initiativeToken}`;
        const isSelected = id === selectedIni;
        return (
          <TouchableOpacity key={ini.initiativeToken} onPress={onPress}>
            <View style={[card, isSelected && selected]}>
              <View style={contents}>
                <View style={tag}>
                  <Text style={tagText}>
                    {`${ini.projectName} > KR ${ini.keyResultIndex} > Ini ${ini.initiativeIndex}`}
                  </Text>
                </View>
                <Text style={iniName}>{ini.initiativeName}</Text>
                <Text style={endDate}>마감일 : {ini.endDate}</Text>
              </View>
              <View style={icon}>{isSelected && <Icons.Back />}</View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProjectIniList;

const container = css`
  padding: 16px 24px;
`;
const card = css`
  background: #27272a;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid transparent;
`;

const contents = css`
  align-items: flex-start;
`;
const selected = css`
  border: 2px solid #1f92f2;
`;
const tag = css`
  background-color: #225d8e;
  padding: 4px 8px;
  border-radius: 6px;
`;

const tagText = css`
  font-size: 12px;
`;

const iniName = css`
  font-weight: 500;
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const endDate = css`
  color: #a9a9a9;
`;
const icon = css`
  width: 24px;
  height: 24px;
  transform: rotate(180deg);
`;
