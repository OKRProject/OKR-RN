import React from 'react';
import {useQuery} from 'react-query';
import api from '../../../api';
import {ProjectIniType} from '../../../api/project';

import keys from '../../keys';

const useGetFeedbacks = ({
  initiativeToken,
}: Pick<ProjectIniType, 'initiativeToken'>) => {
  return useQuery([keys.GET_FEEDBACKS, initiativeToken], () =>
    api.feedback.getIniFeedbacks(initiativeToken),
  );
};

export default useGetFeedbacks;
