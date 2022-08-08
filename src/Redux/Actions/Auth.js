import {CLEARTOKEN, LOGIN, LOGOUT, TOKEN} from '../Types';
import {ApiManager} from '../../backend/ApiManager';
import {setLoaderVisible} from './Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = payload => {
  const {username, password, onFail} = payload;
  return async dispatch => {
    const res = await ApiManager.post('auth/login', {
      username,
      password,
    });
    if (res.ok && res?.data?.isApproved && res?.data != undefined) {
      await AsyncStorage.setItem('token', JSON.stringify(res?.data?.token));
      dispatch(saveToken(res?.data?.token));
      dispatch(whoAmI());
      dispatch(setLoaderVisible(false));
    } else onFail && onFail(res);
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {uid: ''},
  };
};

export const saveToken = payload => {
  return {
    type: TOKEN,
    payload: payload,
  };
};
export const clearToken = payload => {
  return {
    type: CLEARTOKEN,
    payload: payload,
  };
};
export const whoAmI = onFinish => {
  return async dispatch => {
    const res = await ApiManager.get('auth/whoami');
    if (res.ok) dispatch(setUser(res.data));
    else await AsyncStorage.removeItem('token');

    if (onFinish) onFinish();
    return;
  };
};
export const setUser = payload => {
  return {
    type: LOGIN,
    payload: payload,
  };
};
