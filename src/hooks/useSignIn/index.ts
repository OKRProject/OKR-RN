import {useCallback} from 'react';
import {Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import 'react-native-get-random-values';
// import {
//   appleAuth,
//   appleAuthAndroid,
// } from '@invertase/react-native-apple-authentication';
import Config from 'react-native-config';

export type TokenType = {
  isLogin: true;
  accessToken: string;
  refreshToken: string;
};

export type SessionType = {
  isLogin: false;
  session: string;
  email: string;
  username: string;
};

export type SignInResType = SessionType | TokenType;

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
});

console.log(Config.GOOGLE_WEB_CLIENT_ID);

type CallbacksType = {
  signUpCallback: () => void;
};
function isLogin(res: SessionType | TokenType): res is TokenType {
  return (res as TokenType).isLogin === true;
}

const useSignIn = () => {
  const googleSignIn = useCallback(async ({signUpCallback}: CallbacksType) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let idToken = userInfo.idToken;
      if (!idToken) {
        const token = await GoogleSignin.getTokens();
        idToken = token.idToken;
      }
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
