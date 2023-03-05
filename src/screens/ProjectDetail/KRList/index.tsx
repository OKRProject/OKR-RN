import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {css} from '@emotion/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {DefaultText as Text} from '../../../components';
import {KeyResultType} from '../../../api/project';
import IniList from './IniList';

type Props = {
  KRList: KeyResultType[];
  projectTitle: string;
};
const KRList = ({KRList, projectTitle}: Props) => {
  const [selectedKrToken, setSelected] = useState<string>(
    KRList[0].keyResultToken,
  );
  const selectedKR = useMemo(
    () => KRList.find(kr => kr.keyResultToken === selectedKrToken)!,
    [selectedKrToken],
  );
  // const selectedKR = useMemo(() => KRList[selected - 1], [selected]);

  return KRList[0] ? (
    <View style={container}>
      <View style={tabWrap}>
        {KRList.map((kr, idx) => (
          <TouchableWithoutFeedback
            key={`project_detail_${kr.keyResultToken}`}
            style={[tab, selectedKrToken === kr.keyResultToken && tabSelected]}
            onPress={() => setSelected(kr.keyResultToken)}>
            <Text
              style={[
                tabText,
                selectedKrToken === kr.keyResultToken && tabTextSelected,
              ]}>
              {`KR${kr.keyResultIndex}`}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <View style={contentWrap}>
        <Text style={keyTitle}>{selectedKR?.keyResultName}</Text>
        <IniList
          keyResultToken={selectedKR?.keyResultToken}
          projectTitle={projectTitle}
        />
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

export default KRList;
