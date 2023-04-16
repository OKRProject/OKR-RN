import {TouchableOpacity, View} from 'react-native';
import {DefaultText as Text} from '../../../../components';
import React from 'react';
import {css} from '@emotion/native';
import useDeleteKR from '../../../../query/project/useDeleteKR';

type Props = {
  keyResultToken: string;
  onClose: () => void;
};
const Delete = ({keyResultToken, onClose}: Props) => {
  const {mutateAsync: asyncDelete} = useDeleteKR({keyResultToken});
  return (
    <TouchableOpacity
      onPress={async () => {
        await asyncDelete(keyResultToken);
        onClose();
      }}>
      <View
        style={css`
          background-color: #e21616;
          height: 72px;
          padding: 0 18px;
          align-items: center;
          justify-content: center;
        `}>
        <Text
          style={css`
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
          `}>
          삭제
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Delete;
