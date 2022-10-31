import {View} from 'react-native';
import React, {useState} from 'react';
import {css} from '@emotion/native';
import {Header, Title} from '../components';
import {Calendar} from '../../../../components';

type Props = {
  title: string;
  startDt: string;
  endDt: string;
  onChangeTitle: (title: string) => void;
  onChangePeriod: (startDt: string, endDt: string) => void;
  onCancel: () => void;
};
const Period = ({
  title,
  startDt,
  endDt,
  onChangeTitle,
  onCancel,
  onChangePeriod,
}: Props) => {
  const [{start, end}, setDate] = useState<{
    start: string;
    end: string;
  }>({start: startDt, end: endDt});

  const handleCompletePeriod = () => {
    start && end && onChangePeriod(start, end);
  };

  return (
    <View style={container}>
      <Header onClickCancel={onCancel} onClickComplete={handleCompletePeriod} />
      <Title title={title} onChangeTitle={onChangeTitle} />
      <Calendar start={start} end={end} setDate={setDate} title="기간" />
    </View>
  );
};

const container = css`
  padding: 0 24px;
  width: 100%;
  flex: 1;
`;

export default Period;
