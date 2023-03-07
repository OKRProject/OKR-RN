import {css} from '@emotion/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {RootStackParamList} from '../../navigation/main';
import {getDate} from '../../utils/calendar';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import {SafeAreaView} from 'react-native-safe-area-context';

export type NewProjectType = {
  title: string;
  startDt: string;
  endDt: string;
};

const today = new Date().toDateString();

const initProject: NewProjectType = {
  title: '',
  startDt: getDate(today, 0),
  endDt: getDate(today, 6),
};
interface Props
  extends NativeStackScreenProps<RootStackParamList, 'ProjectNew'> {}
const New = ({}: Props) => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const [project, setProject] = useState<NewProjectType>(initProject);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleTitle = (title: string) => setProject(prev => ({...prev, title}));
  const handleNavigateProjectMain = () => navigate('Project');
  const handleSelectDates = ({start, end}: {start: string; end: string}) =>
    setProject(prev => ({...prev, startDt: start, endDt: end}));

  const handleComplete = (members: string[]) => {
    //todo API
    handleNavigateProjectMain();
  };
  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={_container}>
      {step === 1 && (
        <Step1
          onChangeTitle={handleTitle}
          title={project.title}
          onNext={() => setStep(2)}
          onPrev={handleNavigateProjectMain}
        />
      )}
      {step === 2 && (
        <Step2
          onChangeTitle={handleTitle}
          startDt={project.startDt}
          endDt={project.endDt}
          onNext={() => setStep(3)}
          onPrev={() => setStep(1)}
          onSelectDates={handleSelectDates}
        />
      )}
      {step === 3 && (
        <Step3
          onChangeTitle={handleTitle}
          onPrev={() => setStep(2)}
          onComplete={handleComplete}
        />
      )}
    </SafeAreaView>
  );
};

const _container = css`
  width: 100%;
  flex: 1;
  background-color: #18181b;
  min-height: 0;
`;

export default New;
