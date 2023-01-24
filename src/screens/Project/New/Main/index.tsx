import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {Card, Header, OKR, Title} from '../components';
import {NewProjectType} from '..';
import {css} from '@emotion/native';
import {DefaultText as Text} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/main';
import type {StackNavigationProp} from '@react-navigation/stack';
import {dateStringToViewText} from '../../../../utils/calendar';
import {
  CreateNewProjectReqType,
  ProjectTypeEnum,
} from '../../../../api/project';
import api from '../../../../api';

type Props = NewProjectType & {
  setProject: Dispatch<SetStateAction<NewProjectType>>;
  setPeriodPage: (isPeriodPage: boolean) => void;
  onChangeTitle: (title: string) => void;
};

type navigationProps = StackNavigationProp<RootStackParamList>;

const Main = ({
  title,
  setPeriodPage,
  setProject,
  onChangeTitle,
  objective,
  krList,
  startDt,
  endDt,
}: Props) => {
  const navigation = useNavigation<navigationProps>();

  const viewStartDt = useMemo<string>(
    () => dateStringToViewText(startDt),
    [startDt],
  );

  const viewEndDt = useMemo<string>(() => dateStringToViewText(endDt), [endDt]);

  const handleClickPeriod = () => {
    setPeriodPage(true);
  };
  const handleNavigateProjectMain = () =>
    navigation.navigate('Project', {type: 'main'});

  const handleCompleteCreateProject = async () => {
    const body: CreateNewProjectReqType = {
      name: title,
      keyResults: krList,
      sdt: startDt,
      edt: endDt,
      type: ProjectTypeEnum.single,
      objective,
    };
    try {
      const {data} = await api.project.createNewProject(body);
      console.log(data, 'newProject');
      handleNavigateProjectMain();
    } catch (e: any) {
      console.log(e.response.headers, 'header!!!!');
      console.log(e.response.data);
      console.log(e.response, 'error response');
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={container}>
          <Header
            onClickCancel={handleNavigateProjectMain}
            onClickComplete={handleCompleteCreateProject}
          />
          <Title title={title} onChangeTitle={onChangeTitle} />
          <Card title="기간" style={period} onPress={handleClickPeriod}>
            <Text style={periodText}>
              {viewStartDt} - {viewEndDt}
            </Text>
          </Card>
        </View>
      </TouchableWithoutFeedback>
      <OKR setProject={setProject} objective={objective} krList={krList} />
    </>
  );
};

const container = css`
  padding: 0 24px;
  width: 100%;
  flex: 1;
`;

const period = css`
  margin: 16px 0px 41px;
`;
const periodText = css`
  color: #535358;
`;
export default Main;
