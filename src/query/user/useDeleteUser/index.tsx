import React from 'react';
import {useMutation, useQueryClient} from 'react-query';
import api from '../../../api';
import useSignOut from '../../../hooks/useSignOut';

const useDeleteUser = () => {
  const {signOutUser} = useSignOut();
  return useMutation(api.user.deleteUser, {
    onSuccess: () => {
      signOutUser();
    },
  });
};

export default useDeleteUser;
