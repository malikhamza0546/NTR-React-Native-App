import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useMemo, useState} from 'react';
import {Image, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets/images';
import {ApiManager} from '../../backend/ApiManager';
import Button from '../../components/Button';
import Header from '../../components/Header';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText} from '../../components/Texts';
import {saveToken, whoAmI} from '../../Redux/Actions/Auth';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import styles from './styles';
export default function VerifyOtp({navigation, route}) {
  const status = route?.params?.status;

  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const isCode = useMemo(() => {
    if (code.length < 6) return false;
    else return true;
  }, [code]);
  const message = (description, msg = 'Error', type = 'danger') => {
    showMessage({
      message: msg,
      description: description,
      type: type,
    });
  };
  const verifyCode = async () => {
    dispatch(setLoaderVisible(true));
    if (status == 'Verify') {
      let response = await ApiManager.post('auth/verify', {code: code});

      if (!response.ok) {
        message(response.error.error);
      } else {
        message('Account has been approved!', 'Success', 'success');
        dispatch(whoAmI());
      }
      dispatch(setLoaderVisible(false));
    } else if (status) {
      let response = await ApiManager.post(
        'auth/verify-user-to-resetPassword',
        {
          code: code,
          email: route?.params?.email ?? '',
        },
      );

      if (!response.ok) {
        message(response?.error?.error);
      } else {
        message(response?.data?.message, 'Success', 'success');
        dispatch(saveToken(response?.data?.token));
        navigation.navigate('CreatePassword');
      }
      dispatch(setLoaderVisible(false));
    }
  };
  const resendCode = async () => {
    dispatch(setLoaderVisible(true));
    if (status == 'Verify') {
      let resp = await ApiManager.get('auth/resend-verification-email');
      if (resp.ok) {
        message(resp.data.message, 'Success', 'success');
      } else {
        message('Something went wrong');
      }
      dispatch(setLoaderVisible(false));
    } else {
      let resp = await ApiManager.get(
        `auth/forget-password/${route?.params?.email ?? ''}`,
      );

      if (resp.ok) {
        message(resp.data.message, 'Success', 'success');
      } else {
        message('Something went wrong');
      }
      dispatch(setLoaderVisible(false));
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      backgroundColor={AppColors.white}
      barStyle="dark-content"
      headerUnScrollable={() => <Header onPress={() => navigation.goBack()} />}>
      <View style={styles.mainViewContainer}>
        <Image source={Icons.lock} style={styles.iconStyles} />

        <CustomText
          size={5}
          fontWeight="bold"
          textStyles={CommonStyles.marginTop_5}>
          Enter Code
        </CustomText>
        <CustomText
          color={AppColors.black40}
          textStyles={CommonStyles.marginTop_2}>
          Enter 6 digit code sent to your email address here
        </CustomText>
        <View style={styles.otpContainer}>
          <OTPInputView
            style={styles.otpView}
            pinCount={6}
            onCodeChanged={code => {
              setCode(code);
            }}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
          />
        </View>
        <Button
          title="Continue"
          containerStyle={CommonStyles.marginTop_5}
          onPress={verifyCode}
          disabled={!isCode}
        />
        <View style={styles.footerContainer}>
          <CustomText color={AppColors.black40}>
            Didn't received code?
          </CustomText>
          <CustomText
            textStyles={CommonStyles.marginLeft_1}
            onPress={() => {
              resendCode();
            }}>
            Resend Code
          </CustomText>
        </View>
      </View>
    </ScreenWrapper>
  );
}
