import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {height as h} from 'react-native-dimension';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {BgImages, Icons} from '../../assets/images';
import {ApiManager} from '../../backend/ApiManager';
import Avatar from '../../components/Avatar';
import Button, {DropDownButton} from '../../components/Button';
import DropDownModal from '../../components/DropDownModal';
import FilePickerModal from '../../components/FilePickerModal';
import {Input} from '../../components/Input';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText, H1} from '../../components/Texts';
import {WhiteContainer} from '../../components/WhiteContainer';
import {saveToken} from '../../Redux/Actions/Auth';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {ValidateEmail, ValidatePassword} from '../../utills/Methods';
import {OrganizationType} from '../../utills/OrganizationType';
import styles from './styles';

var Categories = [
  {name: 'Direct patient care'},
  {name: 'Unit coordinator/registration'},
  {name: 'Administration'},
  {name: 'Management'},
  {name: 'Call center'},
  {name: 'other'},
];
export default function Signup({navigation, route}) {
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState({val: '', error: null});
  const [email, setEmail] = useState({val: '', error: null});
  const [password, setPassword] = useState({val: '', error: null});
  const [isDirectlyInvolve, setDirectlyInvolve] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOrganizationType, setSelectedOrganizationType] =
    useState(null);
  const selectedOrganization = route?.params?.organization ?? null;
  const toggleCategory = () => setCategoryModalVisible(!categoryModalVisible);
  const [profile, setProfile] = useState(null);
  const imageModalRef = useRef();

  const onChange = (key, val) => {
    if (key == 'fullName') {
      setFullName({
        val,
        error: val != '' ? null : 'Full Name is required',
      });
    } else if (key == 'email') {
      let Valid = ValidateEmail(val);
      setEmail({val, error: Valid.isValid ? null : Valid.message});
    } else if (key == 'password') {
      let Valid = ValidatePassword(val);
      setPassword({val, error: Valid.isValid ? null : Valid.message});
    }
  };
  const valdiateFields = () => {
    let emailValid = ValidateEmail(email.val);
    let passValid = ValidatePassword(password.val);
    if (
      fullName.val != '' &&
      emailValid.isValid &&
      passValid.isValid &&
      selectedOrganizationType != null &&
      selectedCategory != null &&
      isDirectlyInvolve
    ) {
      if (
        selectedOrganization == null &&
        selectedOrganizationType.value == 'other'
      ) {
        dispatch(setLoaderVisible(true));
        signupMethod();
      } else if (selectedOrganization != null) {
        dispatch(setLoaderVisible(true));
        signupMethod();
      } else
        showMessage({
          message: 'Required Fields',
          description: 'Select an organization',
          type: 'danger',
        });
    } else {
      showMessage({
        message: 'Required Fields',
        description:
          selectedOrganizationType == null
            ? 'Select the organization type'
            : fullName.val == ''
            ? 'Full Name is require'
            : !emailValid.isValid
            ? 'Email is invalid'
            : !passValid.isValid
            ? 'Password should be at least 6 characters'
            : selectedCategory == null
            ? 'Select a category'
            : // profile == null ? 'Select a profile image' :
              'You need to agree to the terms',
        type: 'danger',
      });
    }
  };
  const signupMethod = async () => {
    try {
      let body = {
        email: email.val.toLowerCase(),
        fullName: fullName.val,
        password: password.val,
        organization:
          selectedOrganizationType.value == 'other'
            ? '00d00d00d0ddd00000ddd000'
            : selectedOrganization?._id,
        organizationType: selectedOrganizationType.value,
        category: selectedCategory,
      };
      if (profile) body.profileImage = profile.data;
      const response = await ApiManager.post('auth/register', body);
      if (response.ok) {
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(response?.data?.token),
        );
        message(response?.data?.message, 'Success', 'success');
        dispatch(saveToken(response.data.token));
        navigation.navigate('VerifyOtp', {status: 'Verify'});
      } else {
        message(response?.error?.error);
      }
      dispatch(setLoaderVisible(false));
    } catch (error) {
      message('Something went wrong.');
      dispatch(setLoaderVisible(false));
    }
  };
  const message = (description, msg = 'Error', type = 'danger') => {
    showMessage({
      message: msg,
      description: description,
      type: type,
    });
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
        <WhiteContainer style={styles.whiteContainer} height={h(90)}>
          <Avatar
            containerStyle={styles.avatarContainer}
            onEditPress={() => imageModalRef.current.show()}
            source={profile?.path ? {uri: profile?.path} : null}
            size={120}
          />
          <CustomText
            textStyles={CommonStyles.marginTop_1}
            color={AppColors.gray}
            center>
            Image size must be less than 1 MB
          </CustomText>
          <H1 size={6} textStyles={CommonStyles.marginTop_1}>
            Sign Up
          </H1>
          <DropDownButton
            containerStyle={CommonStyles.marginTop_1}
            placeHolder="Select Organization Type"
            Icon
            value={selectedOrganizationType?.name ?? null}
            onPress={() => setShowOrganizationModal(true)}
          />
          {selectedOrganizationType &&
            selectedOrganizationType.value != 'other' && (
              <DropDownButton
                containerStyle={CommonStyles.marginTop_2_5}
                placeHolder="Select Organization"
                Icon
                value={selectedOrganization?.name ?? null}
                onPress={() => {
                  if (selectedOrganizationType._id == 1)
                    navigation.navigate('HospitalSearch', {search: 'Signin'});
                  else if (selectedOrganizationType._id == 2)
                    navigation.navigate('NursingSearch', {search: 'Signin'});
                  else navigation.navigate('EMSSearch', {search: 'Signin'});
                }}
                disabled={!selectedOrganizationType}
              />
            )}
          <Input
            containerStyles={CommonStyles.marginTop_2_5}
            label="Full Name"
            onChangeText={val => onChange('fullName', val)}
            error={fullName.error}
          />
          <Input
            label="Email"
            containerStyles={CommonStyles.marginTop_2}
            onChangeText={val => onChange('email', val)}
            error={email.error}
            keyboardType="email-address"
          />
          <Input
            label="Password"
            containerStyles={CommonStyles.marginTop_2}
            onChangeText={val => onChange('password', val)}
            error={password.error}
            secureTextEntry={true}
          />
          <DropDownButton
            placeHolder="Category"
            Icon
            containerStyle={CommonStyles.marginTop_2}
            onPress={toggleCategory}
            value={selectedCategory}
          />
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              onPress={() => setDirectlyInvolve(!isDirectlyInvolve)}>
              <Image
                source={isDirectlyInvolve ? Icons.check : Icons.uncheck}
                style={styles.checkBoxStyle}
              />
            </TouchableOpacity>
            <CustomText left>
              By clicking box you agree to use app exclusively to facilitate
              patient care and or healthcare organization operations, and or for
              approved testing and app administration.
            </CustomText>
          </View>
          <Button
            title="SIGN UP"
            containerStyle={CommonStyles.marginTop_2}
            onPress={valdiateFields}
          />
          <CustomText
            textStyles={CommonStyles.marginTop_2}
            center
            onPress={() => navigation.navigate('Login')}>
            Already have an account? Login
          </CustomText>
        </WhiteContainer>
      </View>
      <DropDownModal
        isVisible={categoryModalVisible}
        Data={Categories}
        onClose={toggleCategory}
        onPress={val => {
          setSelectedCategory(val?.name);
          toggleCategory();
        }}
      />
      <DropDownModal
        isVisible={showOrganizationModal}
        Data={OrganizationType}
        onClose={() => setShowOrganizationModal(false)}
        onPress={val => {
          navigation.setParams({hospital: ''});
          setSelectedOrganizationType(val);
          setShowOrganizationModal(false);
        }}
      />

      <FilePickerModal
        ref={imageModalRef}
        onFilesSelected={img => {
          if (img.size / 1000000 <= 1) {
            setProfile(img);
          } else alert('Image size cannot exceed 1MB');
        }}
      />
    </ScreenWrapper>
  );
}
