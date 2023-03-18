import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import {ProjectDetailType} from '../../../api/project';
import keys from '../../keys';

const useAddKR = ({projectToken}: Pick<ProjectDetailType, 'projectToken'>) => {
  const queryClient = useQueryClient();
  return useMutation(api.project.addKR, {
    onSuccess: () => {
      queryClient.invalidateQueries([keys.GET_PROJECT_DETAIL, projectToken]);
    },
  });
};

export default useAddKR;
