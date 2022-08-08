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
import {ValidatePassword} from '../../utills/Methods';
import styles from './styles';
export default function CreatePassword({navigation}) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState({val: '', error: null});
  const [confirmPassword, setConfirmPassword] = useState({
    val: '',
    error: null,
  });

  const onChange = (key, val) => {
    if (key == 'password') {
      let Valid = ValidatePassword(val);
      setPassword({val, error: Valid.isValid ? null : Valid.message});
    } else if (key == 'cPassword') {
      setConfirmPassword({
        val,
        error:
          val == password.val
            ? null
            : "Password and confirm password didn't match",
      });
    }
  };
  const resetPasswordMethod = async () => {
    let Valid = ValidatePassword(password.val);
    if (Valid?.isValid && password.val == confirmPassword.val) {
      dispatch(setLoaderVisible(true));
      let response = await ApiManager.post('auth/reset-password', {
        password: password.val,
      });
      if (response?.ok) {
        dispatch(setLoaderVisible(false));
        showMessage({
          message: 'Success',
          description: 'Password Updated Successfully',
          type: 'success',
        });
        navigation.navigate('Login');
      } else {
        dispatch(setLoaderVisible(false));
        showMessage({
          message: 'Error',
          description: 'Something went wrong',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Invalid Field',
        type: 'danger',
      });
    }
  };

  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      barStyle="dark-content"
      scrollEnabled
      headerUnScrollable={() => <Header onPress={() => navigation.goBack()} />}>
      <View style={styles.mainViewContainer}>
        <Image source={Icons.password} style={styles.iconStyles} />
        <CustomText
          size={5}
          fontWeight="bold"
          textStyles={CommonStyles.marginTop_5}>
          Create Password
        </CustomText>
        <CustomText
          color={AppColors.black40}
          textStyles={CommonStyles.marginTop_2}>
          Create your new password for your account
        </CustomText>

        <Input
          label="New Password"
          containerStyles={CommonStyles.marginTop_5}
          onChangeText={val => onChange('password', val)}
          error={password.error}
          secureTextEntry={true}
        />
        <Input
          label="Confirm Password"
          containerStyles={CommonStyles.marginTop_2}
          onChangeText={val => onChange('cPassword', val)}
          error={confirmPassword.error}
          secureTextEntry={true}
        />
        <Button
          title="Continue"
          containerStyle={CommonStyles.marginTop_4}
          onPress={resetPasswordMethod}
        />
      </View>
    </ScreenWrapper>
  );
}
