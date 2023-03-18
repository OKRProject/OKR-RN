import React from 'react';
import {useQuery} from 'react-query';
import api from '../../../api';
import {KeyResultType} from '../../../api/project';

import keys from '../../keys';

const useGetIniList = ({
  keyResultToken,
}: Pick<KeyResultType, 'keyResultToken'>) => {
  return useQuery([keys.GET_INITIATIVE_LIST, keyResultToken], () =>
    api.project.getIniList({
      keyResultToken,
    }),
  );
};

export default useGetIniList;
