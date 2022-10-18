import {useCallback} from 'react';
import {Platform, Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import 'react-native-get-random-values';
import Config from 'react-native-config';
import api from '../../api';
import {SessionType, SignInResType, TokenType} from '../../api/user';
import userStore from '../../store/userStore';

GoogleSignin.configure({
  iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
});

type CallbacksType = {
  signUpCallback: (data: SessionType) => void;
};
function isLogin(res: SignInResType): res is TokenType {
  return (res as TokenType).accessToken !== null;
}

const useSignIn = () => {
  const {setAuthSession, setUserProfile} = userStore();
  const googleSignIn = useCallback(async ({signUpCallback}: CallbacksType) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let idToken = userInfo.idToken;
      console.log(idToken);
      if (!idToken) {
        const token = await GoogleSignin.getTokens();
        idToken = token.idToken;
      }

      const {data} = await api.user.loginByGoogle(idToken);
      if (isLogin(data)) {
        //로그인
        const {refreshToken, accessToken, ...rest} = data;
        setUserProfile({...rest});
        //todo token 저장/header 로직
      } else {
        //회원가입
        setAuthSession(data);
        signUpCallback(data);
      }

      return;
    } catch (error: any) {
      console.log(error, error.message, 'error');
      if (error.code !== '-5') {
      }
    }
    GoogleSignin.signOut();
  }, []);

  const appleSignIn = useCallback(async ({signUpCallback}: CallbacksType) => {
    let idToken: string = '';
    if (Platform.OS === 'ios') {
      // try {
      //   const appleAuthRequestResponse = await appleAuth.performRequest({
      //     requestedOperation: appleAuth.Operation.LOGIN,
      //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      //   });
      //   const {user, email, nonce, identityToken, realUserStatus} =
      //     appleAuthRequestResponse;
      //   const credentialState = await appleAuth.getCredentialStateForUser(
      //     user,
      //   );
      //   //todo idtoken null일 때 토큰 가져오기
      //   idToken = identityToken || '';
      // } catch (error: any) {
      //   console.log(error);
      //   if (error.code !== '1001') {
      //     Toast.show({
      //       type: 'error',
      //       text1: error.message,
      //     });
      //   }
      //   return;
      // }
      // appleAuth.performRequest({
      //   requestedOperation: appleAuth.Operation.LOGOUT,
      // });
    }
  }, []);

  return {
    googleSignIn,
    appleSignIn,
  };
};

export default useSignIn;
