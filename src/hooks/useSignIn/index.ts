import {useCallback} from 'react';
import {Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import 'react-native-get-random-values';
import Config from 'react-native-config';
import api from '../../api';
import {SignInResType, SignInSuccessResType} from '../../api/auth';
import userStore from '../../store/userStore';
import {saveSessions} from '../useAxiosInterceptor';

GoogleSignin.configure({
  iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
});

type CallbacksType = {
  signUpCallback: () => void;
};
function isLogin(res: SignInResType): res is SignInSuccessResType {
  return !!(res as SignInSuccessResType).accessToken;
}

const useSignIn = () => {
  const {setAuthSession, setUserProfile} = userStore();

  const googleSignIn = useCallback(async ({signUpCallback}: CallbacksType) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let idToken = userInfo.idToken;

      if (!idToken) {
        const token = await GoogleSignin.getTokens();
        idToken = token.idToken;
      }
      console.log(idToken);
      const {data} = await api.auth.loginByGoogle(idToken);

      if (isLogin(data)) {
        //로그인
        const {refreshToken, accessToken, ...rest} = data;
        await saveSessions({refreshToken, accessToken});
        setUserProfile({...rest});
      } else {
        //회원가입
        setAuthSession(data);
        signUpCallback();
      }
      // return GoogleSignin.signOut();
    } catch (error: any) {
      console.log(error.response.data, error.response.status, 'error');
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
