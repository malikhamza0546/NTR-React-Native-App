import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {Icons} from '../../assets/images';
import {ApiManager} from '../../backend/ApiManager';
import Button from '../../components/Button';
import Header from '../../components/Header';
import {Input} from '../../components/Input';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText} from '../../components/Texts';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {ValidateEmail} from '../../utills/Methods';
import styles from './styles';
export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState({val: '', error: null});
  const dispatch = useDispatch();

  const forgotPassMethod = async () => {
    let Valid = ValidateEmail(email.val);

    if (Valid?.isValid) {
      dispatch(setLoaderVisible(true));

      let response = await ApiManager.get(
        `auth/forget-password/${email.val.toLowerCase()}`,
      );
      if (response.ok) {
        showMessage({
          message: 'Success',
          description: response?.data?.message,
          type: 'success',
        });
        dispatch(setLoaderVisible(false));
        navigation.navigate('VerifyOtp', {
          status: 'Reset',
          email: email.val.toLowerCase(),
        });
      } else {
        showMessage({
          message: 'Error',
          description: response?.error?.error,
          type: 'danger',
        });
        dispatch(setLoaderVisible(false));
      }
    } else setEmail({error: 'Email is invalid'});
  };
  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      barStyle="dark-content"
      headerUnScrollable={() => <Header onPress={() => navigation.goBack()} />}>
      <View style={styles.mainViewContainer}>
        <CustomText size={5} fontWeight="bold">
          FORGOT YOUR PASSWORD
        </CustomText>
        <Image source={Icons.emailIcon} style={CommonStyles.marginTop_5} />
        <Input
          label="Email"
          containerStyles={CommonStyles.marginTop_5}
          onChangeText={val => {
            let Valid = ValidateEmail(val);
            setEmail({val, error: Valid.isValid ? null : Valid.message});
          }}
          error={email.error}
          keyboardType="email-address"
        />
        <Button
          title="RESET PASSWORD"
          onPress={forgotPassMethod}
          containerStyle={CommonStyles.marginTop_3}
        />
      </View>
    </ScreenWrapper>
  );
}
