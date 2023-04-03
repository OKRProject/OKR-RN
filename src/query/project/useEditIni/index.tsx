import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import {KeyResultType, ProjectIniType} from '../../../api/project';
import keys from '../../keys';

const useEditIni = ({
  keyResultToken,
  initiativeToken,
}: Pick<KeyResultType, 'keyResultToken'> &
  Partial<Pick<ProjectIniType, 'initiativeToken'>>) => {
  const queryClient = useQueryClient();
  return useMutation(api.project.editProjectIni, {
    onSuccess: () => {
      queryClient.invalidateQueries([keys.GET_INITIATIVE_LIST, keyResultToken]);
      queryClient.invalidateQueries([keys.GET_INI_INFO, initiativeToken]);
    },
  });
};

export default useEditIni;
