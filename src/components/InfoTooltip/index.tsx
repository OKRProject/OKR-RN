import {css} from '@emotion/native';
import {ReactNode, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DefaultText from '../DefaultText';
import Icons from '../Icons';
type Props = {children: ReactNode};
const InfoToolTip = ({children}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <TouchableOpacity onPress={() => setIsOpen(true)}>
      <View style={_container}>
        <DefaultText style={_mark}>?</DefaultText>
        <View
          style={[
            _content,
            isOpen &&
              css`
                display: flex;
              `,
          ]}>
          {children}
          <TouchableOpacity
            style={_closeButton}
            onPress={() => setIsOpen(false)}>
            <Icons.Close color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const _container = css`
  width: 16px;
  height: 16px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #202227;
`;

const _mark = css`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #616166;
`;

const _content = css`
  padding: 12px;
  flex-direction: row;
  background-color: #1f92f2;
  border-radius: 8px;
  display: none;
`;

const _closeButton = css`
  width: 12px;
  height: 12px;
`;
export default InfoToolTip;
