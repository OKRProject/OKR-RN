import {TextInput} from 'react-native';
import React, {useRef} from 'react';
import {
  DefaultInput as Input,
  DefaultText as Text,
} from '../../../../../components';
import {css} from '@emotion/native';
import {Card} from '..';

type Props = {
  onChangeTitle?: (text: string) => void;
  title: string;
};

const Title = ({onChangeTitle, title}: Props) => {
  const titleRef = useRef<TextInput>(null);
  const handleClickTitle = () => {
    if (titleRef.current) titleRef.current.focus();
  };
  return (
    <Card title="프로젝트명" onPress={handleClickTitle}>
      <Input
        editable={!!onChangeTitle}
        inputRef={titleRef}
        style={input}
        value={title}
        onChangeText={onChangeTitle}
        placeholder="다같이 런닝!"
      />
    </Card>
  );
};

const input = css``;

export default Title;
