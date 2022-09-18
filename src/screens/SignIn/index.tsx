import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSignIn} from '../../hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';

interface Props extends NativeStackScreenProps<RootStackParamList, 'SignIn'> {}

const SignIn = ({navigation}: Props) => {
  const signInCallbacks = {
    signUpCallback: () => navigation.navigate('SignUp'),
  };
  const {appleSignIn, googleSignIn} = useSignIn();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text>SignIn</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await googleSignIn(signInCallbacks);
          }}>
          <Text>Sign in with google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await appleSignIn(signInCallbacks);
          }}>
          <Text>Sign in with apple</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9EFFD',
    paddingVertical: 30,
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
    width: 200,
    alignItems: 'center',
  },
});
