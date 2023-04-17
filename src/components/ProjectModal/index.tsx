import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DefaultModal as Modal, DefaultText as Text, Icons} from '..';
import {css} from '@emotion/native';
import query from '../../query';

type Props = {
  onClose: () => void;
  isVisible: boolean;
  projectToken: string;
};

const ProjectModal = ({onClose, projectToken, ...rest}: Props) => {
  const {useDeleteProject, useCompleteProject} = query.project;
  const {mutateAsync: asyncDeleteProject} = useDeleteProject({projectToken});
  const {mutateAsync: asyncCompleteProject} = useCompleteProject({
    projectToken,
  });
  return (
    <Modal {...rest} onClose={onClose}>
      <View style={_container}>
        <TouchableOpacity
          onPress={async () => {
            await asyncDeleteProject(projectToken);
            onClose();
          }}
          style={[
            _button,
            css`
              border-bottom-width: 1px;
            `,
          ]}>
          <View>
            <Icons.Trash />
          </View>
          <Text style={_text}>삭제하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={_button}
          onPress={async () => {
            await asyncCompleteProject(projectToken);
            onClose();
          }}>
          <View>
            <Icons.CompleteCheck />
          </View>
          <Text style={_text}>완료하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const _container = css`
  width: 100%;
  padding-bottom: 100px;
`;

const _button = css`
  flex-direction: row;
  padding: 15px;
  border: 0px solid #35353a;
`;

const _text = css`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  margin-left: 16px;
`;
export default ProjectModal;
