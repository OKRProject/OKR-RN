import {SafeAreaView, View} from 'react-native';
import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {Background} from '../../components';
import {Header} from './components';
import StepName from './StepName';
import StepCategory from './StepCategory';
import StepField from './StepField';
import {css} from '@emotion/native';
import api from '../../api';
import userStore from '../../store/userStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/main';
import {saveSessions} from '../../hooks/useAxiosInterceptor';
import StepComplete from './StepComplete';
import {UserProfileType} from '../../api/user';

export type StepType = 'name' | 'field' | 'category' | 'complete';
type navigationProps = StackNavigationProp<RootStackParamList>;

const SignUp = () => {
  const navigation = useNavigation<navigationProps>();
  const {setAuthSession, session} = userStore();
  const [step, setStep] = useState<StepType>('name');
  const [profile, setProfile] = useState<UserProfileType>();
  const [categoryList, setCategoryList] = useState<{[key in string]: string}>();
  const [fieldList, setFieldList] = useState<{[key in string]: string}>();
  const [{name, field, category}, setPersonalInfo] = useState<{
    name: string;
    field?: string;
    category?: string;
  }>({name: session?.name ?? ''});

  const init = async () => {
    const {data} = await api.user.getCategory();
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
    const {data} = await api.user.getFields(category);

    const list = data.reduce(
      (prev, cur) => ({...prev, [cur.code]: cur.title}),
      {},
    );

    setFieldList(list);
  };

  const handleSelectField = (field: string) =>
    setPersonalInfo(prev => ({...prev, field}));

  const handleComplete = async () => {
    if (!session || !field || !fieldList) return;
    const body = {
      guestUserId: session.guestUserId,
      email: session.email,
      name,
      jobField: field,
    };

    try {
      const {data} = await api.user.signUp(body);
      const {refreshToken, accessToken, ...rest} = data;
      await saveSessions({refreshToken, accessToken});
      setProfile(rest);
      setAuthSession(undefined);
      setStep('complete');
    } catch (e: any) {
      console.log(e.response.data, 'error');
    }
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
      complete: <></>,
    }),
    [name, field, category, setPersonalInfo, categoryList, fieldList],
  );

  return (
    <Background>
      {step === 'complete' && profile ? (
        <StepComplete profile={profile} />
      ) : (
        <View style={container}>
          <Header onClickBack={handleClickBack} />
          {StepPage[step]}
        </View>
      )}
    </Background>
  );
};

export default SignUp;

const container = css`
  flex: 1;
`;
