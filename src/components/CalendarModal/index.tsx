import {View} from 'react-native';
import React, {useState} from 'react';
import {DefaultModal as Modal, TextButton} from '..';
import {css} from '@emotion/native';
import SelectCalendar from '../SelectCalendar';

type Props = {
  isVisible: boolean;
  startDt: string;
  endDt: string;
  onChangePeriod: (startDt: string, endDt: string) => void;
  onCancel: () => void;
};
const CalendarModal = ({
  isVisible,
  startDt,
  endDt,
  onChangePeriod,
  onCancel,
}: Props) => {
  const [{start, end}, setDate] = useState<{
    start: string;
    end: string;
  }>({start: startDt, end: endDt});

  const handleCompletePeriod = () => {
    start && end && onChangePeriod(start, end);
  };
  return (
    <Modal isVisible={isVisible} onClose={onCancel}>
      <View style={buttons}>
        <TextButton onPress={onCancel} style={button}>
          취소
        </TextButton>
        <TextButton onPress={handleCompletePeriod}>완료</TextButton>
      </View>
      <SelectCalendar start={start} end={end} setDate={setDate} />
    </Modal>
  );
};

const buttons = css`
  flex-direction: row;
  margin-left: auto;
  margin-bottom: 24px;
`;

const button = css`
  margin-right: 16px;
  color: #a9a9a9;
`;
export default CalendarModal;
