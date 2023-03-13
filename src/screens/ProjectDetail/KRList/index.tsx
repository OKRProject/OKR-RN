import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {css} from '@emotion/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {DefaultText as Text, Icons} from '../../../components';
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
      <View style={[_title]}>
        <View style={_flex}>
          <Text style={_tag}>핵심 결과</Text>
        </View>
        <View style={_addButton}>
          <Icons.Plus />
        </View>
      </View>
      {KRList.length === 0 ? (
        <View style={[_item, _empty]}>
          <Text style={_emptyText}>
            + 버튼을 눌러 핵심 결과를 추가해 보세요!
          </Text>
        </View>
      ) : (
        <View style={_itemContainer}>
          {KRList.map((kr, idx) => (
            <View
              style={[_item, _krItem]}
              key={`key_result_${kr.keyResultToken}`}>
              <Text style={_index}>{idx + 1}</Text>
              <Text style={_krName}>{kr.keyResultName}</Text>
              <View style={_arrow}>
                <Icons.Back />
              </View>
            </View>
          ))}
        </View>
      )}
      {/*  <View style={tabWrap}>
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
      </View> */}
    </View>
  ) : (
    <></>
  );
};

const container = css`
  flex: 1;
  width: 100%;
`;

const _title = css`
  padding: 0 24px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const _tag = css`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #616166;
`;

const _flex = css`
  flex-direction: row;
`;
const _addButton = css`
  width: 24px;
  height: 24px;
`;

const _item = css`
  width: 100%;
  background: #202227;
  padding: 24px;
`;

const _empty = css`
  align-items: center;
  justify-content: center;
`;

const _emptyText = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: #616166;
`;

const _itemContainer = css`
  width: 100%;
`;

const _krItem = css`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const _index = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  color: #616166;
`;
const _arrow = css`
  width: 24px;
  height: 24px;
  transform: rotate(270deg);
`;

const _krName = css`
  flex: 1;
  margin: 0 15px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
`;
export default KRList;
