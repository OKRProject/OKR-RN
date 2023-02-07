import {View} from 'react-native';
import React from 'react';
import {DefaultModal as Modal, DefaultText as Text, RatioInput} from '..';
import {css} from '@emotion/native';
import {SortTypeEnum} from '../../api/project';
import OnOff from '../OnOff';

type Props = {
  onClose: () => void;
  isVisible: boolean;
  onSelect: (value: SortTypeEnum) => void;
  onIncludeSwitch: () => void;
  selected: SortTypeEnum;
  includeComplete: boolean;
};

export type SortStatus = {
  sort: SortTypeEnum;
  includeFinished: boolean;
};

const SortingModal = ({
  onSelect,
  selected,
  includeComplete,
  onIncludeSwitch,
  ...rest
}: Props) => {
  return (
    <Modal {...rest} close>
      <Text style={_title}>정렬</Text>
      <View style={_container}>
        <RatioInput
          isSelected={selected === SortTypeEnum.RECENTLY_CREATE}
          style={_ratio}
          onPress={() => onSelect(SortTypeEnum.RECENTLY_CREATE)}>
          작성 최근 순
        </RatioInput>
        <RatioInput
          isSelected={selected === SortTypeEnum.DEADLINE_CLOSE}
          style={_ratio}
          onPress={() => onSelect(SortTypeEnum.DEADLINE_CLOSE)}>
          마감일 순
        </RatioInput>
        <RatioInput
          isSelected={selected === SortTypeEnum.PROGRESS_HIGH}
          style={_ratio}
          onPress={() => onSelect(SortTypeEnum.PROGRESS_HIGH)}>
          진척도 높은 순
        </RatioInput>
        <RatioInput
          isSelected={selected === SortTypeEnum.PROGRESS_LOW}
          style={_ratio}
          onPress={() => onSelect(SortTypeEnum.PROGRESS_LOW)}>
          진척도 낮은 순
        </RatioInput>
        <OnOff onToggle={onIncludeSwitch} isOn={includeComplete}>
          완료된 프로젝트 포함
        </OnOff>
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
