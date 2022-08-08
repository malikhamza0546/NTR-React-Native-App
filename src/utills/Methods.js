import {showMessage} from 'react-native-flash-message';
import {exp} from 'react-native-reanimated';
import store from '../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {saveToken, whoAmI} from '../Redux/Actions/Auth';
import SplashScreen from 'react-native-splash-screen';
import moment from 'moment';

export const ValidateEmail = email => {
  if (email.length < 1)
    return {isValid: false, message: `Email cannot be empty.`};
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = re.test(String(email).trim().toLowerCase());
  return {isValid, message: isValid ? `Email is valid` : `Email is invalid`};
};
export const ValidatePassword = val => {
  if (val.length < 1)
    return {isValid: false, message: `Password cannot be empty`};
  if (val.length < 6)
    return {
      isValid: false,
      message: `Password should be at least 6 characters`,
    };
  else return {isValid: true, message: `Password is valid`};
};
export const ValidatePhone = val => {
  let reg = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
  if (val.match(reg)) return {isValid: true, message: `Phone is valid`};
  else return {isValid: false, message: `Phone is well formatted.`};
};
export const ValidateNumeric = val => {
  let reg = /[^0-9]/;
  if (!reg.test(val)) return {isValid: true, message: `Valid Input.`};
  else return {isValid: false, message: `Invalid Input.`};
};
export const getToken = () => {
  const state = store.getState();
  const authToken = state.Auth.token;
  return authToken;
};

/**
 *
 * @param {number} radius in meters
 */
export const radiusToLatDelta = radius => {
  return radius * 0.00000900537;
};
/**
 *
 * @param {number} miles
 */
export const milesToKms = miles => (miles * 1.6).toFixed(2);
/**
 *
 * @param {number} kms
 */
export const kmsToMiles = kms => (kms / 1.6).toFixed(2);
export const errorMessage = (msg, title = 'Error', type = 'danger') => {
  showMessage({
    title: title,
    message: msg,
    type: type,
  });
};
export const successMessage = (msg, title = 'Success', type = 'success') => {
  showMessage({
    title: title,
    message: msg,
    type: type,
  });
};

export const shouldShowDisclaimer = async () => {
  const response = await AsyncStorage.getItem('disclaimerDate');
  let currentDate = moment().format('YYYY-MM-DD');
  if (response) {
    if (moment(currentDate).isSame(response)) {
      await AsyncStorage.setItem(
        'disclaimerDate',
        moment().add(7, 'days').format('YYYY-MM-DD'),
      );
      return 1;
    } else return 0;
  } else {
    await AsyncStorage.setItem(
      'disclaimerDate',
      moment().add(7, 'days').format('YYYY-MM-DD'),
    );
    return 1;
  }
};
export const checkUserSession = async () => {
  let token = await AsyncStorage.getItem('token');
  if (token) {
    store.dispatch(saveToken(JSON.parse(token)));
    store.dispatch(whoAmI(() => SplashScreen.hide()));
  } else SplashScreen.hide();
};
