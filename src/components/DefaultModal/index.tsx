import React, {ReactNode} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {css} from '@emotion/native';
import Modal from 'react-native-modal';
import Icons from '../Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type DefaultModalProps = {
  onClose: () => void;
  isVisible: boolean;
  close?: boolean;
};

type Props = DefaultModalProps & {
  children: ReactNode;
};

const DefaultModal = ({children, isVisible, onClose, close}: Props) => {
  return (
    <Modal isVisible={isVisible} style={background} onBackdropPress={onClose}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <View
            style={[
              contents,
              !close &&
                css`
                  padding-top: 20px;
                `,
            ]}>
            {close && (
              <View style={header}>
                <TouchableOpacity style={closeButton} onPress={onClose}>
                  <Icons.Close color={'#fff'} />
                </TouchableOpacity>
              </View>
            )}
            <View style={content}>{children}</View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const background = css`
  margin: -24px 0;
  justify-content: flex-end;
`;

const contents = css`
  background: #1e1e22;
  border: 1px solid #35353a;
  border-radius: 24px 24px 0 0;
  margin-top: auto;
  padding-bottom: 97px;
`;

const header = css`
  width: 100%;
  padding: 20px 20px 0px 20px;
`;

const closeButton = css`
  width: 24px;
  height: 24px;
  margin-left: auto;
`;

const content = css`
  padding: 0 27px;
`;
export default DefaultModal;
