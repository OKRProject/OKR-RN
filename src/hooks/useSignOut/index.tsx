import {useCallback} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../api';
import userStore from '../../store/userStore';

export const clearUserSession = async () => {
  console.log('clear');
  try {
    await EncryptedStorage.removeItem('user_session');
  } catch (e) {
    console.log(e, '삭제할 세션 없음');
  }
};

const useSignOut = () => {
  const {setUserProfile} = userStore();

  const signOutUser = useCallback(
    async (callFailed?: boolean) => {
      console.log('signout');
      // if (!callFailed) api.user.signOut({device});
      clearUserSession();
      setUserProfile(undefined);
    },
    [setUserProfile],
  );

  return {
    signOutUser,
  };
};

export default useSignOut;
