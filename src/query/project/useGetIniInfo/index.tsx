import React from 'react';
import {useQuery} from 'react-query';
import api from '../../../api';
import {ProjectIniType, ProjectType} from '../../../api/project';

import keys from '../../keys';

const useGetIniInfo = ({
  initiativeToken,
}: Pick<ProjectIniType, 'initiativeToken'>) => {
  return useQuery([keys.GET_PROJECT_DETAIL, initiativeToken], () =>
    api.project.getProjectIni(initiativeToken),
  );
};

export default useGetIniInfo;
