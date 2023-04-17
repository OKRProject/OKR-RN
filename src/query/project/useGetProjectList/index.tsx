import React from 'react';
import {useQuery} from 'react-query';
import api from '../../../api';
import {ProjectTypeEnum, SortTypeEnum} from '../../../api/project';

import keys from '../../keys';

const useGetProjectList = ({
  page,
  projectType,
}: {
  projectType: ProjectTypeEnum;
  page: number;
}) => {
  return useQuery(
    [keys.GET_PROJECT_LIST, page, projectType],
    () =>
      api.project.getProjectList({
        sort: SortTypeEnum.RECENTLY_CREATE,
        includeFinished: true,
        page,
        projectType,
      }),
    {},
  );
};

export default useGetProjectList;
