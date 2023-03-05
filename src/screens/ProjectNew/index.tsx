import {css} from '@emotion/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Background, CalendarModal} from '../../components';
import {RootStackParamList} from '../../navigation/main';
import {getDate} from '../../utils/calendar';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

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
  const [isPeriodPage, setPeriodPage] = useState<boolean>(false);

  const handleTitle = (title: string) => setProject(prev => ({...prev, title}));
  const handleChangePeriod = (startDt: string, endDt: string) => {
    setProject(prev => ({...prev, startDt, endDt}));
    setPeriodPage(false);
  };
  const handleCancelSelectPeriod = () => setPeriodPage(false);
  const handleNavigateProjectMain = () => navigate('Project');
  return (
    <Background>
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
          onPrev={handleNavigateProjectMain}
        />
      )}
      {step === 3 && (
        <Step3
          onChangeTitle={handleTitle}
          onNext={() => setStep(3)}
          onPrev={handleNavigateProjectMain}
        />
      )}
      <CalendarModal
        isVisible={isPeriodPage}
        startDt={project.startDt}
        endDt={project.endDt}
        onCancel={handleCancelSelectPeriod}
        onChangePeriod={handleChangePeriod}
      />
    </Background>
  );
};

const container = css`
  width: 100%;
  flex: 1;
  border: 1px solid red;
  background-color: red;
`;

export default New;
