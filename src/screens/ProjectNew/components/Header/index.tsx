import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {Icons, DefaultText as Text} from '../../../../components';

type Props = {
  onClickPrev: () => void;
  title: string;
  desc: string;
};
const Header = ({onClickPrev, title, desc}: Props) => {
  return (
    <View style={_header}>
      <TouchableOpacity onPress={onClickPrev} style={_button}>
        <Icons.Back />
      </TouchableOpacity>
      <View>
        <Text style={_title}>{title}</Text>
        <Text style={_desc}>{desc}</Text>
      </View>
    </View>
  );
};

const _header = css`
  padding-top: 11px;
`;

const _button = css`
  width: 24px;
  height: 24px;
  margin-bottom: 34px;
`;

const _title = css`
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
`;

const _desc = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #a9a9a9;
  max-width: 240px;
  margin-top: 5px;
`;
export default Header;
