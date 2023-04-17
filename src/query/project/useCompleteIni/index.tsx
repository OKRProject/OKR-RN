import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import {KeyResultType} from '../../../api/project';
import keys from '../../keys';

const useCompleteIni = () => {
  const queryClient = useQueryClient();
  return useMutation(api.project.completeProjectIni, {
    onSuccess: () => {
      queryClient.invalidateQueries(keys.GET_PROJECT_LIST);
    },
  });
};

export default useCompleteIni;
