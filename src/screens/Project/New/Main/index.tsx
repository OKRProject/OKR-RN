import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {View} from 'react-native';
import {Card, Header, OKR, Title} from '../components';
import {NewProjectType} from '..';
import {css} from '@emotion/native';
import {DefaultText as Text} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/main';
import type {StackNavigationProp} from '@react-navigation/stack';
import {dateStringToViewText} from '../../../../utils/calendar';

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
  object,
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

  const handleClickPeriod = () => setPeriodPage(true);
  const handleNavigateProjectMain = () =>
    navigation.navigate('Project', {type: 'main'});

  return (
    <>
      <View style={container}>
        <Header
          onClickCancel={handleNavigateProjectMain}
          onClickComplete={() => {}}
        />
        <Title title={title} onChangeTitle={onChangeTitle} />
        <Card title="기간" style={period} onPress={handleClickPeriod}>
          <Text style={periodText}>
            {viewStartDt} - {viewEndDt}
          </Text>
        </Card>
      </View>
      <OKR setProject={setProject} object={object} krList={krList} />
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
