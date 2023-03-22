import React from 'react';
import {useQuery} from 'react-query';
import api from '../../../api';

import keys from '../../keys';

const useGetFeedbackRequired = () => {
  return useQuery([keys.GET_REQUIRED_FEEDBACKS], () =>
    api.feedback.getFeedbackRequiredList(),
  );
};

export default useGetFeedbackRequired;
