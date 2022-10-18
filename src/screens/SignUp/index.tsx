import {SafeAreaView} from 'react-native';
import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {Background} from '../../components';
import {Header} from './components';
import StepName from './StepName';
import StepCategory from './StepCategory';
import StepField from './StepField';
import {css} from '@emotion/native';
import api from '../../api';
import {FieldListType} from '../../api/user';
import userStore from '../../store/userStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/main';

const dum = [
  {code: '기획', title: '기획'},
  {code: '디자인', title: '디자인'},
  {code: '프론트', title: '프론트엔드 개발'},
  {code: '백엔드 개발', title: '백엔드 개발'},
  {code: '직무・마케팅', title: '직무・마케팅'},
  {code: '기타', title: '기타'},
];

export type StepType = 'name' | 'field' | 'category';
type navigationProps = StackNavigationProp<RootStackParamList>;

const SignUp = () => {
  const navigation = useNavigation<navigationProps>();
  const {setUserProfile, session} = userStore();
  const [step, setStep] = useState<StepType>('name');
  const [categoryList, setCategoryList] = useState<{[key in string]: string}>();
  const [fieldList, setFieldList] = useState<{[key in string]: string}>();
  const [{name, field, category}, setPersonalInfo] = useState<{
    name: string;
    field?: string;
    category?: string;
  }>({name: session?.name ?? ''});

  const init = async () => {
    // const {data} = await api.user.getCategory();
    const data: FieldListType = dum;
    const list = data.reduce(
      (prev, cur) => ({...prev, [cur.code]: cur.title}),
      {},
    );

    setCategoryList(list);
  };

  const handleChangeName = (name: string) =>
    setPersonalInfo(prev => ({...prev, name}));

  const handleSelectCategory = async (category: string) => {
    setPersonalInfo(prev => ({...prev, category}));
    // const {data} = await api.user.getFields(category);
    const data: FieldListType = dum;
    const list = data.reduce(
      (prev, cur) => ({...prev, [cur.code]: cur.title}),
      {},
    );
    setFieldList(list);
  };

  const handleSelectField = (field: string) =>
    setPersonalInfo(prev => ({...prev, field}));

  const handleComplete = () => {
    //todo api
    //201이면 setUser
    const data = {
      email: 'moa@gmail.com',
      name: '김모아',
      profileImage: '',
      field: '프론트엔드',
    };
    setUserProfile(data);
  };

  const handleClickBack = () => {
    if (step === 'name') return navigation.goBack();
    if (step === 'category') return setStep('name');
    if (step === 'field') return setStep('category');
  };
  useEffect(() => {
    init();
  }, []);

  const StepPage: {[key in StepType]: ReactNode} = useMemo(
    () => ({
      name: (
        <StepName name={name} onChange={handleChangeName} nextStep={setStep} />
      ),
      category: (
        <StepCategory<typeof categoryList>
          onSelect={handleSelectCategory}
          categoryList={categoryList}
          selectedCategory={category}
          nextStep={setStep}
        />
      ),
      field: (
        <StepField<typeof fieldList>
          fieldList={fieldList}
          onSelect={handleSelectField}
          selectedField={field}
          onComplete={handleComplete}
        />
      ),
    }),
    [name, field, category, setPersonalInfo, categoryList],
  );

  return (
    <Background>
      <SafeAreaView style={container}>
        <Header onClickBack={handleClickBack} />
        {StepPage[step]}
      </SafeAreaView>
    </Background>
  );
};

export default SignUp;

const container = css`
  flex: 1;
`;
