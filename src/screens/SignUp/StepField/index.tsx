import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Layout} from '../components';
import {css} from '@emotion/native';
import {DefaultText as Text, RoundSquareButton} from '../../../components';

const desc = `프로필에 표시될 대표 분야입니다.
협업 시 팀원들에게 보여집니다.`;

type Props<T> = {
  selectedField?: string;
  fieldList?: T;
  onSelect: (code: keyof T) => void;
  onComplete: () => void;
};

const StepField: <P extends {[key: string]: string} | undefined>(
  p: React.PropsWithChildren<Props<P>>,
) => React.ReactElement<Props<P>> = ({
  selectedField,
  fieldList,
  onSelect,
  onComplete,
}) => {
  const handleComplete = () => selectedField && onComplete();
  return (
    <Layout title="대표 분야를 선택해 주세요" desc={desc}>
      <View style={container}>
        {fieldList && (
          <View style={categoryWrap}>
            {Object.keys(fieldList).map(code => (
              <TouchableOpacity
                key={`user_field_select_${code}`}
                style={[fieldItem, selectedField === code && selectedItem]}
                onPress={() => {
                  /* @ts-ignore */
                  onSelect(code as keyof typeof fieldList);
                }}>
                <Text
                  style={[fieldText, selectedField === code && selectedText]}>
                  {fieldList[code]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <RoundSquareButton
          type={selectedField ? 'primary' : 'disable'}
          size="m"
          onPress={handleComplete}>
          완료
        </RoundSquareButton>
      </View>
    </Layout>
  );
};

const container = css`
  flex: 1;
  justify-content: space-between;
`;

const categoryWrap = css`
  margin-top: 48px;
  padding: 0 12px;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const fieldItem = css`
  margin: 0 4px 12px 4px;
  padding: 10px 20px;
  border-radius: 50px;
  background-color: #27272a;
  border: 2px solid #18181b;
`;

const fieldText = css`
  font-size: 16px;
`;

const selectedItem = css`
  border: 2px solid #1f92f2;
`;

const selectedText = css`
  color: #1f92f2;
`;

export default StepField;
