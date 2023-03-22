import {css} from '@emotion/native';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useClickOutside from '../../hooks/useClickOutside';
import DefaultText from '../DefaultText';
import Icons from '../Icons';
type Props = {children: ReactNode};
const InfoToolTip = ({children}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false));
  useEffect(() => {}, []);

  return (
    <TouchableOpacity onPress={() => setIsOpen(true)}>
      <View style={_container} ref={ref}>
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
  position: absolute;
  top: 100%;
  z-index: 999;
  left: -80px;
`;

const _closeButton = css`
  width: 12px;
  height: 12px;
`;
export default InfoToolTip;
