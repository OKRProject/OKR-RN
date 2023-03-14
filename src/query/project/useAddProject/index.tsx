import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import keys from '../../keys';

const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation(api.project.createNewProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(keys.ADD_PROJECT);
    },
  });
};

export default useAddProject;
