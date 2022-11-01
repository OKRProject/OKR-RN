import {View} from 'react-native';
import {css} from '@emotion/native';
import React, {useMemo, useState} from 'react';
import {
  CalendarModal,
  DefaultModal as Modal,
  DefaultText as Text,
  RoundCard,
  RoundInput,
  RoundSquareButton,
} from '../../../../components';
import {DefaultModalProps} from '../../../../components/DefaultModal';
import {AddProjectIniReqType} from '../../../../api/project';
import api from '../../../../api';
import {dateStringToViewText, getDate} from '../../../../utils/calendar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../navigation/main';
import {useNavigation} from '@react-navigation/native';

const today = new Date().toDateString();

type NavigationProps = StackNavigationProp<RootStackParamList>;

type Props = DefaultModalProps & {
  KRId: number;
  onClose: () => void;
};

const IniAdd = ({KRId, onClose, ...rest}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const [isCalendar, setCalendar] = useState<boolean>(false);
  const [initiative, setInitiative] = useState<AddProjectIniReqType>({
    keyResultId: KRId,
    name: '',
    edt: getDate(today, 6),
    sdt: getDate(today, 0),
    detail: '',
  });

  const handleCompleteNewAdd = async () => {
    const {data} = await api.project.addProjectIni(initiative);
    onClose();
    navigation.navigate('Ini', {type: 'detail', iniId: data});
  };

  const handleChangeDate = (sdt: string, edt: string) => {
    setInitiative(prev => ({...prev, sdt, edt}));
    setCalendar(false);
  };

  const handleCloseCalendar = () => setCalendar(false);
  const handleChangeName = (name: string) =>
    setInitiative(prev => ({...prev, name}));
  const handleChangeDetail = (detail: string) =>
    setInitiative(prev => ({...prev, detail}));
  const viewStartDt = useMemo<string>(
    () => dateStringToViewText(initiative.sdt),
    [initiative.sdt],
  );

  const viewEndDt = useMemo<string>(
    () => dateStringToViewText(initiative.edt),
    [initiative.edt],
  );

  return isCalendar ? (
    <CalendarModal
      isVisible
      onCancel={handleCloseCalendar}
      onChangePeriod={handleChangeDate}
      startDt={initiative.sdt}
      endDt={initiative.edt}
    />
  ) : (
    <Modal {...rest}>
      <>
        <View style={inputWrap}>
          <Text style={label}>이니셔티브 (Ini)</Text>
          <RoundInput
            placeholder="매일 공원 3km씩 달리기"
            value={initiative.name}
            onChangeText={handleChangeName}
          />
        </View>
        <View style={inputWrap}>
          <Text style={label}>상세내용</Text>
          <RoundInput
            multiline
            value={initiative.detail}
            style={desc}
            onChangeText={handleChangeDetail}
          />
        </View>
        <View style={inputWrap}>
          <Text style={label}>마감일</Text>
          <TouchableOpacity onPress={() => setCalendar(true)}>
            <RoundCard style={roundBox}>
              <Text>
                {viewStartDt} - {viewEndDt}
              </Text>
            </RoundCard>
          </TouchableOpacity>
        </View>
        <RoundSquareButton
          style={button}
          type="primary"
          size="xl"
          onPress={handleCompleteNewAdd}>
          이니셔티브 작성 완료
        </RoundSquareButton>
      </>
    </Modal>
  );
};

const inputWrap = css`
  margin-top: 25px;
`;

const label = css`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const roundBox = css`
  padding: 16px 17px;
`;

const button = css`
  margin-top: 55px;
`;

const desc = css`
  min-height: 160px;
`;

export default IniAdd;
