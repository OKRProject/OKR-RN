import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import keys from '../../keys';

const useValidateEmail = () => {
  const queryClient = useQueryClient();
  return useMutation(api.user.validateEmail, {
    onSuccess: () => {},
  });
};

export default useValidateEmail;
