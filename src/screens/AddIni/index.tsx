import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Background,
  DefaultInput,
  Header,
  Icons,
  RoundSquareButton,
} from '../../components';
import {css} from '@emotion/native';
import {RootStackParamList} from '../../navigation/main';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Step1 from './step1';
import {AddProjectIniReqType} from '../../api/project';
import {getDate} from '../../utils/calendar';
import Step2 from './step2';
import query from '../../query';

const today = new Date().toDateString();
interface Props extends NativeStackScreenProps<RootStackParamList, 'AddIni'> {}

const AddIni = ({navigation, route}: Props) => {
  const {keyResultName, keyResultToken, projectToken} = route.params;
  const [step, setStep] = useState<1 | 2>(1);
  const [ini, setIni] = useState<AddProjectIniReqType>({
    startDate: getDate(today, 0),
    endDate: getDate(today, 0),
    detail: '',
    name: '',
    keyResultToken,
  });

  const {mutateAsync} = query.project.useAddIni({keyResultToken});
  const handleAddKR = async () => {
    try {
      await mutateAsync(ini);
      navigation.goBack();
    } catch (e) {}
  };

  const handleSelectDates = ({start, end}: {start: string; end: string}) => {
    setIni(prev => ({...prev, startDate: start, endDate: end}));
  };

  return (
    <>
      {step === 1 ? (
        <Step1
          route={route}
          onPrev={() => navigation.goBack()}
          onNext={() => setStep(2)}
          onChange={({name, detail}) =>
            setIni(prev => ({...prev, name, detail}))
          }
          initial={{name: ini.name, detail: ini.detail}}
        />
      ) : (
        <Step2
          startDate={ini.startDate}
          endDate={ini.endDate}
          onSelectDates={handleSelectDates}
          onPrev={() => setStep(1)}
          onComplete={handleAddKR}
        />
      )}
    </>
  );
};

export default AddIni;
