import React from 'react';
import {useQuery} from 'react-query';
import api from '../../../api';
import {ProjectIniType, ProjectType} from '../../../api/project';

import keys from '../../keys';

const useGetIniInfo = ({
  initiativeToken,
}: Partial<Pick<ProjectIniType, 'initiativeToken'>>) => {
  return useQuery(
    [keys.GET_INI_INFO, initiativeToken],
    () => api.project.getProjectIni(initiativeToken ?? ''),
    {enabled: !!initiativeToken},
  );
};

export default useGetIniInfo;
