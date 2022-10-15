import {View} from 'react-native';
import React, {ReactNode} from 'react';
import {DefaultText as Text} from '../../../../components';
import {css} from '@emotion/native';

type Props = {
  children: ReactNode;
  title: string;
  desc: string;
};
const Layout = ({children, title, desc}: Props) => {
  return (
    <View style={container}>
      <Text style={titleText}>{title}</Text>
      <Text style={description}>{desc}</Text>
      {children}
    </View>
  );
};

const container = css`
  padding: 14px 20px;
`;
const titleText = css`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 30px;
`;

const description = css`
  color: #a9a9a9;
  text-align: left;
  line-height: 17px;
`;
export default Layout;
