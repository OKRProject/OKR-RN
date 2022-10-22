import {View} from 'react-native';
import React, {useState} from 'react';
import {css} from '@emotion/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {DefaultText as Text} from '../../../../components';
import {KeyResultType} from '../../../../api/project';

type Props = {
  krList: KeyResultType[];
};
const IniList = ({krList}: Props) => {
  const [selected, setSelected] = useState<number>(krList[0].keyResultId);
  return krList[selected - 1] ? (
    <View style={container}>
      <View style={tabWrap}>
        {krList.map(kr => (
          <TouchableWithoutFeedback
            style={[tab, selected === kr.keyResultId && tabSelected]}
            onPress={() => setSelected(kr.keyResultId)}>
            <Text
              style={[tabText, selected === kr.keyResultId && tabTextSelected]}>
              {`KR${kr.keyResultId}`}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <View style={contentWrap}>
        <Text style={keyTitle}>{krList[selected - 1].keyResultName}</Text>
      </View>
    </View>
  ) : (
    <></>
  );
};

const container = css`
  flex: 1;
  width: 100%;
`;

const tabWrap = css`
  padding: 0 24px;
  flex-direction: row;
  justify-content: flex-start;
`;
const tab = css`
  border-radius: 8px 8px 0px 0px;
  padding: 9px 22px 8px 22px;
`;

const tabSelected = css`
  background: #27272a;
`;

const tabText = css`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;

const tabTextSelected = css`
  color: #1f92f2;
`;

const contentWrap = css`
  flex: 1;
  width: 100%;
  background: #27272a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.14);
  padding: 26px 27px;
`;

const keyTitle = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 26px;
`;

export default IniList;