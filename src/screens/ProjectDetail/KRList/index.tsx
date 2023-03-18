import {TouchableOpacity, View, TouchableWithoutFeedback} from 'react-native';
import React, {useMemo, useState} from 'react';
import {css} from '@emotion/native';

import {DefaultText as Text, Icons} from '../../../components';
import {KeyResultType} from '../../../api/project';
import IniList from './IniList';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/main';

type Props = {
  KRList: KeyResultType[];
  projectToken: string;
};
const KRList = ({KRList, projectToken}: Props) => {
  const [selectedKRToken, setSelected] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <ScrollView style={container}>
        <View style={[_title]}>
          <View style={_flex}>
            <Text style={_tag}>핵심 결과</Text>
          </View>
          <TouchableOpacity
            style={_addButton}
            onPress={() =>
              KRList.length < 3 && navigation.navigate('AddKR', {projectToken})
            }>
            <Icons.Plus />
          </TouchableOpacity>
        </View>
        {KRList.length === 0 ? (
          <View style={[_item, _empty]}>
            <Text style={_emptyText}>
              + 버튼을 눌러 핵심 결과를 추가해 보세요!
            </Text>
          </View>
        ) : (
          <View style={_itemContainer}>
            {KRList.map((kr, idx) => {
              const opened = kr.keyResultToken === selectedKRToken;
              return (
                <>
                  <View
                    style={[_item, _krItem]}
                    key={`key_result_${kr.keyResultToken}_${idx}`}>
                    <Text style={_index}>{idx + 1}</Text>
                    <Text style={_krName}>{kr.keyResultName}</Text>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        setSelected(opened ? null : kr.keyResultToken)
                      }>
                      <View
                        style={[
                          _arrow,
                          opened &&
                            css`
                              transform: rotate(90deg);
                            `,
                        ]}>
                        <Icons.Back />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  {opened && (
                    <IniList
                      KRTitle={kr.keyResultName}
                      KRToken={kr.keyResultToken}
                      projectToken={projectToken}
                    />
                  )}
                </>
              );
            })}
          </View>
        )}
      </ScrollView>
    </>
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
