import {View, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {ProjectIniType} from '../../../api/project';
import {css} from '@emotion/native';
import {DefaultText as Text, Icons} from '../../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/main';
import {dateStringToViewText, getDayLabel} from '../../../utils/calendar';

type Props = {
  iniList: ProjectIniType[];
  onClick: (date: {start: string; end: string}) => void;
  selectedDate: string;
  date?: {startDt: string; endDt: string};
};
const ProjectIniList = ({iniList, onClick, selectedDate}: Props) => {
  const [selectedIni, setSelectedIni] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const selectedDateStringView = useMemo(
    () =>
      `${dateStringToViewText(selectedDate, true)} ${getDayLabel(
        selectedDate,
      )}`,
    [selectedDate],
  );

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
    <ScrollView style={_container}>
      <Text style={_selectedDate}>{selectedDateStringView}</Text>
      {iniList.length > 0 ? (
        iniList.map((ini, idx) => {
          const onPress = () => handleClickIni(ini);
          const id = `${ini.projectToken}-${ini.keyResultToken}-${ini.initiativeToken}`;
          const isSelected = id === selectedIni;
          return (
            <TouchableOpacity key={ini.initiativeToken} onPress={onPress}>
              <View
                style={[
                  _card,
                  isSelected && _selected,
                  idx + 1 === iniList.length &&
                    css`
                      margin-bottom: 48px;
                    `,
                ]}>
                <View style={_contents}>
                  <Text style={_iniName}>{ini.initiativeName}</Text>
                  <View style={_projectDateWrap}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../../../img/icn-calendar.png')}
                    />
                    <Text style={_projectDate}>
                      {ini.startDate} - {ini.endDate}
                    </Text>
                  </View>
                </View>
                <View style={_icon}>{isSelected && <Icons.Back />}</View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View style={_emptyCard}>
          <Text style={_emptyTitle}>진행중인 행동전략이 없어요.</Text>
          <Text style={_emptyDesc}>
            핵심결과를 달성하기위한 행동전략을 세워보세요.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ProjectIniList;

const _container = css`
  padding: 16px 24px;
  flex: 1;
  border: 0px solid #35353a;
  border-top-width: 1px;
`;

const _selectedDate = css`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  padding: 8px;
  margin-bottom: 16px;
`;

const _emptyCard = css`
  height: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const _emptyTitle = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
`;

const _emptyDesc = css`
  line-height: 150%;
  font-weight: 500;
  font-size: 13px;
  color: #a9a9a9;
  margin-top: 8px;
`;

const _card = css`
  background: #27272a;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid transparent;
`;

const _contents = css`
  align-items: flex-start;
`;
const _selected = css`
  border: 2px solid #1f92f2;
`;

const _iniName = css`
  font-weight: 500;
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const _projectDateWrap = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const _projectDate = css`
  color: #a9a9a9;
  margin-left: 6px;
`;
const _icon = css`
  width: 24px;
  height: 24px;
  transform: rotate(180deg);
`;
