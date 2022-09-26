import {useCallback} from 'react';
import {Platform, Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import 'react-native-get-random-values';

// import {
//   appleAuth,
//   appleAuthAndroid,
// } from '@invertase/react-native-apple-authentication';
import Config from 'react-native-config';
import api from '../../api';
import {SessionType, TokenType} from '../../api/user';

GoogleSignin.configure({
  // webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
});

type CallbacksType = {
  signUpCallback: (data: SessionType) => void;
};
function isLogin(res: SessionType | TokenType): res is TokenType {
  return (res as TokenType).accessToken !== null;
}

const useSignIn = () => {
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
      }
      return;
    } catch (error: any) {
      console.log(error, 'error');
      if (error.code !== '-5') {
      }
    }
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
    }
  }, []);

  return {
    googleSignIn,
    appleSignIn,
  };
};

export default useSignIn;
