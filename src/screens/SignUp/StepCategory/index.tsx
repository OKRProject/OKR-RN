import {View} from 'react-native';
import React from 'react';
import {Layout} from '../components';
import {RoundSquareButton} from '../../../components';
import {css} from '@emotion/native';
import {StepType} from '..';

const desc = `프로필에 표시될 대표 분야입니다.
협업 시 팀원들에게 보여집니다.`;

type Props<T> = {
  selectedCategory?: string;
  categoryList?: T;
  onSelect: (code: keyof T) => void;
  nextStep: (step: StepType) => void;
};
const StepCategory: <P extends {[key: string]: string} | undefined>(
  p: React.PropsWithChildren<Props<P>>,
) => React.ReactElement<Props<P>> = ({
  categoryList,
  onSelect,
  selectedCategory,
  nextStep,
}) => {
  const handleComplete = () => selectedCategory && nextStep('field');
  return (
    <Layout title="대표 분야를 선택해 주세요" desc={desc}>
      <View style={container}>
        {categoryList && (
          <View style={categoryWrap}>
            {Object.keys(categoryList).map(code => (
              <RoundSquareButton
                key={`user_category_select_${code}`}
                type="dark"
                size="l"
                style={categoryItem}
                onPress={() => onSelect(code as keyof typeof categoryList)}
                isSelected={selectedCategory === code}>
                {categoryList[code]}
              </RoundSquareButton>
            ))}
          </View>
        )}
        <RoundSquareButton
          type={selectedCategory ? 'primary' : 'disable'}
          size="m"
          onPress={handleComplete}>
          다음
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
`;

const categoryItem = css`
  margin-bottom: 8px;
`;

export default StepCategory;
