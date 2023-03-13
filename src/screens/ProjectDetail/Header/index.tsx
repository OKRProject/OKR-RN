import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {Icons, DefaultText as Text} from '../../../components';

type Props = {
  onClickBack: () => void;
  onClickMenu: () => void;
};

const Header = ({onClickBack, onClickMenu}: Props) => {
  return (
    <View style={_container}>
      <View style={_buttonWrap}>
        <TouchableOpacity style={_button} onPress={onClickBack}>
          <Icons.Back />
        </TouchableOpacity>
        <Text style={_title}>OKR</Text>
        <TouchableOpacity style={_button} onPress={onClickMenu}>
          <Icons.AddPerson />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const _container = css`
  padding: 7px 24px 3px 24px;
`;

const _buttonWrap = css`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
`;

const _button = css`
  width: 24px;
  height: 24px;
`;

const _title = css`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #616166;
`;

export default Header;
