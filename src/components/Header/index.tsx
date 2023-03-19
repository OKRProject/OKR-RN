import {View} from 'react-native';
import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icons, DefaultText as Text} from '..';
import {css} from '@emotion/native';

type Props = {
  title?: string;
  onMenu?: () => void;
  onBack?: () => void;
};

const Header = ({title, onBack, onMenu}: Props) => {
  const onlyTitle = useMemo(() => !onMenu && !onBack, [onBack, onMenu]);
  return (
    <View style={[container, onlyTitle && noButtonHeader]}>
      <TouchableOpacity style={[button, onlyTitle && hide]} onPress={onBack}>
        {onBack && <Icons.Back />}
      </TouchableOpacity>
      <Text style={titleText}>{title}</Text>
      <TouchableOpacity style={[button, onlyTitle && hide]} onPress={onMenu}>
        {onMenu && <Icons.Menu />}
      </TouchableOpacity>
    </View>
  );
};
const container = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px;
`;

const noButtonHeader = css`
  justify-content: flex-start;
  padding: 14px 24px;
`;
const button = css`
  width: 24px;
  height: 24px;
`;

const hide = css`
  width: 0;
`;
const titleText = css`
  font-weight: 600;
  font-size: 20px;
`;
export default Header;
