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
import query from '../../query';
import {NewProjectType} from '../../api/project';

export type NewProjectTypeInput = Pick<
  NewProjectType,
  'objective' | 'endDate' | 'startDate'
>;

const today = new Date().toDateString();

const initProject: NewProjectTypeInput = {
  objective: '',
  startDate: getDate(today, 0),
  endDate: getDate(today, 6),
};
interface Props
  extends NativeStackScreenProps<RootStackParamList, 'ProjectNew'> {}
const New = ({}: Props) => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const [project, setProject] = useState<NewProjectTypeInput>(initProject);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleTitle = (objective: string) =>
    setProject(prev => ({...prev, objective}));
  const handleNavigateProjectMain = () => navigate('Project');
  const handleSelectDates = ({start, end}: {start: string; end: string}) => {
    setProject(prev => ({...prev, startDate: start, endDate: end}));
  };

  const {mutate} = query.project.useAddProject();

  const handleComplete = (members: string[]) => {
    mutate({teamMembers: members, ...project});
    handleNavigateProjectMain();
  };
  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={_container}>
      {step === 1 && (
        <Step1
          onChangeTitle={handleTitle}
          objective={project.objective}
          onNext={() => setStep(2)}
          onPrev={handleNavigateProjectMain}
        />
      )}
      {step === 2 && (
        <Step2
          sdt={project.startDate}
          edt={project.endDate}
          onNext={() => setStep(3)}
          onPrev={() => setStep(1)}
          onSelectDates={handleSelectDates}
        />
      )}
      {step === 3 && (
        <Step3 onPrev={() => setStep(2)} onComplete={handleComplete} />
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
