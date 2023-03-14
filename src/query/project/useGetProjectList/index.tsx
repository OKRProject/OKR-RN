import React from 'react';
import {useQuery} from 'react-query';
import api from '../../../api';
import {SortTypeEnum} from '../../../api/project';

import keys from '../../keys';

const useGetProjectList = ({}: {projectType: 'ALL' | 'TEAM' | 'SINGLE'}) => {
  return useQuery([keys.GET_PROJECT_LIST], () =>
    api.project.getProjectList({
      sort: SortTypeEnum.RECENTLY_CREATE,
      includeFinished: true,
    }),
  );
};

export default useGetProjectList;
