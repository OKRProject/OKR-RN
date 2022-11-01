import Main from './Main';
import New from './New';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';
import Detail from './Detail';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Project'> {}

const Project = ({route, ...rest}: Props) => {
  if (route.params.type === 'main') return <Main route={route} {...rest} />;
  if (route.params.type === 'new') return <New route={route} {...rest} />;
  if (route.params.type === 'detail')
    return (
      <Detail route={route} {...rest} projectId={route.params.projectId} />
    );
  return <Main route={route} {...rest} />;
};

export default Project;
