import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import {
  KeyResultType,
  ProjectDetailType,
  ProjectIniType,
} from '../../../api/project';
import keys from '../../keys';

const useWriteFeedback = ({
  initiativeToken,
}: Pick<ProjectIniType, 'initiativeToken'>) => {
  const queryClient = useQueryClient();
  return useMutation(api.feedback.addFeedback, {
    onSuccess: () => {
      queryClient.invalidateQueries([keys.GET_INI_INFO, initiativeToken]);
    },
  });
};

export default useWriteFeedback;
