import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import {GetProjectListResType, ProjectType} from '../../../api/project';
import keys from '../../keys';

const useDeleteProject = ({
  projectToken,
}: Pick<ProjectType, 'projectToken'>) => {
  const queryClient = useQueryClient();
  return useMutation(api.project.deleteProject, {
    onSuccess: () => {
      queryClient.setQueryData<{data: GetProjectListResType} | undefined>(
        [keys.GET_PROJECT_LIST],
        prev => {
          if (prev)
            return {
              data: {
                ...prev.data,
                content: prev.data.content.filter(
                  project => project.projectToken !== projectToken,
                ),
              },
            };
        },
      );
    },
  });
};

export default useDeleteProject;
