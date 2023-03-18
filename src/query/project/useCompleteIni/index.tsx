import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import {KeyResultType, ProjectDetailType} from '../../../api/project';
import keys from '../../keys';

const useCompleteIni = ({
  keyResultToken,
}: Pick<KeyResultType, 'keyResultToken'>) => {
  const queryClient = useQueryClient();
  return useMutation(api.project.completeProjectIni, {
    onSuccess: () => {
      queryClient.invalidateQueries([keys.GET_INITIATIVE_LIST, keyResultToken]);
    },
  });
};

export default useCompleteIni;
