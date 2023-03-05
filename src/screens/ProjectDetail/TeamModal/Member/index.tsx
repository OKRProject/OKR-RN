import {Image, View} from 'react-native';
import React from 'react';
import {css} from '@emotion/native';
import {DefaultText as Text} from '../../../../components';
import {TeamMemberType} from '../../../../api/project';

type Props = TeamMemberType;

const Member = ({profileImage, userName, jobField}: Props) => {
  return (
    <View style={container}>
      <View
        style={css`
          flex-direction: row;
        `}>
        <View style={imageWrap}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: profileImage}}
          />
        </View>
        <Text style={name}>{userName}</Text>
      </View>
      <View>
        <Text style={field}>({jobField})</Text>
      </View>
    </View>
  );
};

export default Member;

const container = css`
  margin-bottom: 18px;
`;

const imageWrap = css`
  width: 28px;
  height: 28px;
  border-radius: 50px;
  overflow: hidden;
  background-color: #a9a9a9;
`;

const name = css`
  margin: 0 9px;
  font-weight: 500;
  font-size: 20px;
`;

const field = css`
  font-size: 16px;
  color: #a9a9a9;
  margin-left: 36px;
`;
