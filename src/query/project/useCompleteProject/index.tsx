import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import {ProjectType} from '../../../api/project';
import keys from '../../keys';

const useCompleteProject = ({
  projectToken,
}: Pick<ProjectType, 'projectToken'>) => {
  const queryClient = useQueryClient();
  return useMutation(api.project.deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries([keys.GET_PROJECT_LIST]);
    },
  });
};

export default useCompleteProject;
