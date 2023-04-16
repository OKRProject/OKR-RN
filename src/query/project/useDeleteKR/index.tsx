import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import {GetProjectDetailResType, KeyResultType} from '../../../api/project';
import keys from '../../keys';

const useDeleteKR = ({
  keyResultToken,
}: Pick<KeyResultType, 'keyResultToken'>) => {
  const queryClient = useQueryClient();
  return useMutation(api.project.deleteKeyResult, {
    onSuccess: () => {
      queryClient.setQueryData<{data: GetProjectDetailResType} | undefined>(
        [keys.GET_PROJECT_LIST],
        prev => {
          if (prev)
            return {
              data: {
                ...prev.data,
                keyResults: prev.data.keyResults.filter(
                  kr => kr.keyResultToken !== keyResultToken,
                ),
              },
            };
        },
      );
    },
  });
};

export default useDeleteKR;
