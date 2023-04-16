import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import {GetProjectIniListResType, ProjectIniType} from '../../../api/project';
import keys from '../../keys';

const useDeleteIni = ({
  initiativeToken,
}: Pick<ProjectIniType, 'initiativeToken'>) => {
  const queryClient = useQueryClient();
  return useMutation(api.project.deleteIni, {
    onSuccess: () => {
      queryClient.setQueryData<{data: GetProjectIniListResType} | undefined>(
        [keys.GET_PROJECT_LIST],
        prev => {
          if (prev)
            return {
              data: {
                ...prev.data,
                content: prev.data.content.filter(
                  ini => ini.initiativeToken !== initiativeToken,
                ),
              },
            };
        },
      );
    },
  });
};

export default useDeleteIni;
