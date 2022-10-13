import React, {Dispatch, SetStateAction} from 'react';
import {View} from 'react-native';
import {Card, Header, OKR, Title} from '../components';
import {NewProjectType} from '..';
import {css} from '@emotion/native';
import {DefaultText as Text} from '../../../../components';

type Props = NewProjectType & {
  setProject: Dispatch<SetStateAction<NewProjectType>>;
  setPeriodPage: Dispatch<SetStateAction<boolean>>;
  onChangeTitle: (title: string) => void;
};
const Main = ({
  title,
  setPeriodPage,
  setProject,
  onChangeTitle,
  object,
  krList,
}: Props) => {
  const handleClickPeriod = () => setPeriodPage(true);
  return (
    <>
      <View style={container}>
        <Header onClickCancel={() => {}} onClickComplete={() => {}} />
        <Title title={title} onChangeTitle={onChangeTitle} />
        <Card title="기간" style={period} onPress={handleClickPeriod}>
          <Text style={periodText}>2022년 00월 00일 - 2022년 00월 00일</Text>
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
