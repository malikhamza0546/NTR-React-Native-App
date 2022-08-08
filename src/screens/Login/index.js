import React, {useState} from 'react';
import {View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {BgImages} from '../../assets/images';
import Button from '../../components/Button';
import {Input} from '../../components/Input';
import {Logo} from '../../components/Logo';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText, H1} from '../../components/Texts';
import {WhiteContainer} from '../../components/WhiteContainer';
import {login, saveToken} from '../../Redux/Actions/Auth';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import styles from './styles';
import {ValidateEmail, ValidatePassword} from '../../utills/Methods';
import {ApiManager} from '../../backend/ApiManager';
export default function Dashboard({navigation}) {
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState({val: '', error: null});
  const [password, setPassword] = useState({val: '', error: null});
  const onChange = (key, val) => {
    if (key == 'email') {
      let Valid = ValidateEmail(val);
      setEmail({val, error: Valid.isValid ? null : Valid.message});
    } else if (key == 'password') {
      let Valid = ValidatePassword(val);
      setPassword({val, error: Valid.isValid ? null : Valid.message});
    }
  };
  const message = (description, msg = 'Error', type = 'danger') => {
    showMessage({
      message: msg,
      description: description,
      type: type,
    });
  };
  const onFail = async res => {
    if (res.ok) {
      message(res?.data?.message, 'Info', 'info');
      dispatch(saveToken(res?.data?.token));

      let response = await ApiManager.get('auth/resend-verification-email');
      if (response.ok) {
        navigation.navigate('VerifyOtp', {status: 'Verify'});
      }
      dispatch(setLoaderVisible(false));
    } else {
      message('Invalid Credentials ', res?.error);
      dispatch(setLoaderVisible(false));
    }
  };
  const loginMethod = () => {
    let emailValid = ValidateEmail(email.val);
    let passValid = ValidatePassword(password.val);
    if (emailValid.isValid && passValid.isValid) {
      dispatch(setLoaderVisible(true));
      dispatch(
        login({
          username: email.val.toLowerCase(),
          password: password.val,
          onFail,
        }),
      );
    } else {
      message('Empty Fields');
    }
  };
  return (
    <ScreenWrapper
      backgroundImage={BgImages.authBg}
      backgroundColor={AppColors.black}
      transclucent
      scrollEnabled
      statusBarColor={AppColors.transparent}
      barStyle="light-content">
      <View style={styles.mainViewContainer}>
        <Logo />
        <WhiteContainer style={styles.whiteContainer}>
          <H1 textStyles={CommonStyles.marginBottom_3}>Login</H1>
          <Input
            label="Email"
            onChangeText={val => onChange('email', val)}
            error={email.error}
            keyboardType="email-address"
          />
          <Input
            label="Password"
            containerStyles={CommonStyles.marginTop_3}
            onChangeText={val => onChange('password', val)}
            error={password.error}
            secureTextEntry={true}
          />
          <CustomText
            textStyles={CommonStyles.marginTop_1}
            right
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password?
          </CustomText>
          <Button
            title="LOGIN"
            onPress={loginMethod}
            containerStyle={CommonStyles.marginTop_3}
          />
          <CustomText
            textStyles={CommonStyles.marginTop_3}
            center
            onPress={() => navigation.navigate('Signup')}>
            Don't have an account? Register
          </CustomText>
        </WhiteContainer>
      </View>
    </ScreenWrapper>
  );
}
