import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {css} from '@emotion/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  CalendarModal,
  DefaultModal as Modal,
  DefaultText as Text,
  RoundCard,
  RoundInput,
  RoundSquareButton,
} from '../../../../components';
import {DefaultModalProps} from '../../../../components/DefaultModal';
import {AddProjectIniReqType, ProjectIniType} from '../../../../api/project';
import api from '../../../../api';
import {dateStringToViewText, getDate} from '../../../../utils/calendar';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../navigation/main';
import {useNavigation} from '@react-navigation/native';

const today = new Date().toDateString();

type NavigationProps = StackNavigationProp<RootStackParamList>;

type Props = DefaultModalProps & {
  keyResultToken: string;
  projectTitle: string;
  onClose: () => void;
  originData?: ProjectIniType & {wroteFeedback: boolean};
};
const initial = {
  name: '',
  edt: getDate(today, 6),
  sdt: getDate(today, 0),
  detail: '',
};
const IniAdd = ({
  keyResultToken,
  onClose,
  projectTitle,
  originData,
  ...rest
}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const [isCalendar, setCalendar] = useState<boolean>(false);
  const [initiative, setInitiative] = useState<AddProjectIniReqType>({
    keyResultToken,
    ...(originData
      ? {
          name: originData.initiativeName,
          detail: originData.initiativeDetail,
          sdt: originData.startDate,
          edt: originData.endDate,
        }
      : initial),
  });

  useEffect(() => {
    setInitiative(prev => ({...prev, keyResultToken}));
  }, [keyResultToken]);

  const handleComplete = async () => {
    if (!originData) return;
    try {
      const {data} = await api.project.updateProjectIni(
        originData.initiativeToken,
        initiative,
      );
      navigation.navigate('Ini', {type: 'detail', initiativeToken: data});
      setInitiative({keyResultToken, ...initial});
      onClose();
    } catch (e: any) {
      console.log(e.response, 'error');
    }
  };
  const handleCompleteNewAdd = async () => {
    try {
      const {data} = await api.project.addProjectIni(initiative);
      navigation.navigate('Ini', {type: 'detail', initiativeToken: data});
      setInitiative({keyResultToken, ...initial});
      onClose();
    } catch (e: any) {
      console.log(e.response, 'error');
    }
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
    <Modal {...rest} onClose={onClose}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <View>
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
              onPress={originData ? handleComplete : handleCompleteNewAdd}>
              이니셔티브 작성 완료
            </RoundSquareButton>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
