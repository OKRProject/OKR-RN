import {View, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {useSignIn} from '../../hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';
import {Background, DefaultText as Text, Icons} from '../../components';
import {css} from '@emotion/native';

interface Props extends NativeStackScreenProps<RootStackParamList, 'SignIn'> {}

const SignIn = ({navigation}: Props) => {
  const signInCallbacks = {
    signUpCallback: () => navigation.navigate('SignUp'),
  };
  const {appleSignIn, googleSignIn} = useSignIn();
  const handleGoogleSignIn = async () => {
    await googleSignIn(signInCallbacks);
  };

  const handleAppleSignIn = async () => {
    await appleSignIn(signInCallbacks);
  };

  const handleClickTerms = () => navigation.navigate('Terms');
  const handleClickPolicy = () => navigation.navigate('Policy');
  return (
    <Background>
      <SafeAreaView style={container}>
        <View>
          <Text style={logoHighlight}>나의 프로젝트를 한눈에!</Text>
          <Text style={logoDesc}>나의 OKR 앱</Text>
          <Image
            style={{height: 40, width: 132}}
            resizeMode="contain"
            source={require('../../img/icn-logo-row.png')}
          />
        </View>
        <View style={bottom}>
          <TouchableOpacity style={button} onPress={handleGoogleSignIn}>
            <View style={icon}>
              <Icons.Google />
            </View>
            <Text style={buttonText}>Google로 계속하기</Text>
            <View style={icon} />
          </TouchableOpacity>
          <TouchableOpacity style={button} onPress={handleAppleSignIn}>
            <View style={icon}>
              <Icons.Apple />
            </View>
            <Text style={buttonText}>Apple로 계속하기</Text>
            <View style={icon} />
          </TouchableOpacity>
          <View style={termAndPolicy}>
            <Text style={termAndPolicyText}>가입 하시면, 모아의 </Text>
            <TouchableOpacity
              style={termAndPolicyButton}
              onPress={handleClickTerms}>
              <Text style={termAndPolicyText}>이용약관</Text>
            </TouchableOpacity>
            <Text style={termAndPolicyText}>과 </Text>
            <TouchableOpacity
              style={termAndPolicyButton}
              onPress={handleClickPolicy}>
              <Text style={termAndPolicyText}>개인정보 수집 및 이용</Text>
            </TouchableOpacity>
            <Text style={termAndPolicyText}>에 동의하게 됩니다.</Text>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default SignIn;

const container = css`
  margin: 60px 40px 108px 40px;
  flex: 1;
  justify-content: space-between;
`;

const logoDesc = css`
  font-size: 32px;
  line-height: 44px;
  margin-bottom: 8px;
`;

const bottom = css`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 18px;
`;

const logoHighlight = css`
  color: #1f92f2;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 12px;
`;

const button = css`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  padding: 12px;
  margin-top: 16px;
`;

const buttonText = css`
  color: #212121;
  font-weight: 600;
  font-size: 16px;
`;

const icon = css`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const termAndPolicy = css`
  max-width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 40px;
`;
const termAndPolicyText = css`
  font-size: 12px;
  font-weight: 500;
`;
const termAndPolicyButton = css`
  border-bottom-color: #fff;
  border-bottom-width: 1px;
`;
