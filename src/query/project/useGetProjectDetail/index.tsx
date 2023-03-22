import React from 'react';
import {useQuery} from 'react-query';
import api from '../../../api';
import {ProjectType} from '../../../api/project';

import keys from '../../keys';

const useGetProjectDetail = ({
  projectToken,
}: Pick<ProjectType, 'projectToken'>) => {
  return useQuery([keys.GET_PROJECT_DETAIL, projectToken], () =>
    api.project.getProjectDetail({
      projectToken,
    }),
  );
};

export default useGetProjectDetail;
