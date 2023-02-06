import {View} from 'react-native';
import React from 'react';
import {DefaultModal as Modal, DefaultText as Text, RatioInput} from '..';
import {css} from '@emotion/native';

type Props = {
  onClose: () => void;
  isVisible: boolean;
  onSelect: (value: SortType) => void;
  onIncludeSwitch: () => void;
  selected: SortType;
  includeComplete: boolean;
};

export type SortType =
  | 'newest'
  | 'close-soon'
  | 'progress-higher'
  | 'progress-lower';

export type SortStatus = {
  type: SortType;
  includeComplete: boolean;
};

const SortingModal = ({
  onSelect,
  selected,
  includeComplete,
  ...rest
}: Props) => {
  return (
    <Modal {...rest} close>
      <Text style={_title}>정렬</Text>
      <View style={_container}>
        <RatioInput
          isSelected={selected === 'newest'}
          style={_ratio}
          onPress={() => onSelect('newest')}>
          작성 최근 순
        </RatioInput>
        <RatioInput
          isSelected={selected === 'close-soon'}
          style={_ratio}
          onPress={() => onSelect('close-soon')}>
          마감일 순
        </RatioInput>
        <RatioInput
          isSelected={selected === 'progress-higher'}
          style={_ratio}
          onPress={() => onSelect('progress-higher')}>
          진척도 높은 순
        </RatioInput>
        <RatioInput
          isSelected={selected === 'progress-lower'}
          style={_ratio}
          onPress={() => onSelect('progress-lower')}>
          진척도 낮은 순
        </RatioInput>
      </View>
    </Modal>
  );
};

const _title = css`
  font-weight: 700;
  font-size: 24px;
  color: #fff;
`;

const _container = css`
  margin-top: 34px;
`;

const _ratio = css`
  margin-bottom: 16px;
`;
export default SortingModal;
