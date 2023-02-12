import {View, Text} from 'react-native';
import React from 'react';
import {Icons, RoundCard} from '../../../../components';
import {css} from '@emotion/native';

const EmptyCard = () => {
  return (
    <RoundCard style={emptyCard}>
      <Text style={emptyDesc}>아직 등록된 프로젝트가 없어요.</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 8,
        }}>
        <Text style={emptyDesc}>하단의</Text>
        <View style={emptyButton}>
          <View style={plus}>
            <Icons.Plus />
          </View>
        </View>
        <Text style={emptyDesc}>버튼을 클릭해</Text>
      </View>
      <Text style={emptyDesc}>새 프로젝트를 만들어보세요!</Text>
    </RoundCard>
  );
};

const emptyCard = css`
  padding: 51px 17px 42px 17px;
  margin-bottom: 12px;
`;

const emptyDesc = css`
  color: #a9a9a9;
  text-align: center;
  font-size: 18px;
`;

const emptyButton = css`
  background-color: #1f92f2;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  margin: 0 6px;
`;

const plus = css`
  width: 10px;
  height: 10px;
`;

export default EmptyCard;
