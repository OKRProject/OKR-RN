import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {Icons, DefaultText as Text} from '../../../../components';
import {dateStringToViewText} from '../../../../utils/calendar';

type Props = {
  projectName: string;
  projectStartDt: string;
  projectEndDt: string;
  onClickBack: () => void;
};

const Header = ({
  projectName,
  projectStartDt,
  projectEndDt,
  onClickBack,
}: Props) => {
  return (
    <View style={container}>
      <View style={buttonWrap}>
        <TouchableOpacity style={button} onPress={onClickBack}>
          <Icons.Back />
        </TouchableOpacity>
        <TouchableOpacity style={button}>
          <Icons.Menu />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={titleText}>{projectName}</Text>
        <Text style={periodText}>
          {dateStringToViewText(projectStartDt)} -{' '}
          {dateStringToViewText(projectEndDt)}
        </Text>
      </View>
    </View>
  );
};

const container = css`
  padding: 7px 24px 3px 24px;
`;
const buttonWrap = css`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 12px;
`;
const button = css`
  width: 24px;
  height: 24px;
`;

const titleText = css`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
`;
const periodText = css`
  font-weight: 500;
  font-size: 12px;
  color: #636363;
  line-height: 18px;
`;

export default Header;
