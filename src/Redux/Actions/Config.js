import { SETCOORDS, SETLOADERVISIBLE } from '../Types';
import RNLocation from 'react-native-location';
import { showMessage } from 'react-native-flash-message';
import store from '../index'
import { getHospitals, getRadius } from './Hospital';
import { getNursingHomes } from './Nursing';
import { getEMSData } from './EMS';
import { TestEmails } from '../../backend/Config';
RNLocation.configure({
  distanceFilter: 5.0
})

export const setLoaderVisible = (payload) => {
  return {
    type: SETLOADERVISIBLE,
    payload: payload,
  };
};
export const coordsSelector = state => state.Config.coords;
export const getCoords = () => store.getState().Config.coords

export const setLocationCoords = () => {
  return dispatch => {
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(async granted => {
      if (granted) {
        const location = await RNLocation.getLatestLocation({ timeout: 6000 })
        if (location?.latitude && location?.longitude) {
          const isTestUser = TestEmails.includes(store.getState().Auth?.user?.username)
          const lat = isTestUser ? 44.448421 : location.latitude;
          const lon = isTestUser ? -89.860813 : location.longitude;
          dispatch(setCoords(lat, lon))
          dispatch(getHospitals([lon, lat], getRadius()))
          dispatch(getNursingHomes([lon, lat], getRadius()))
          dispatch(getEMSData([lon, lat], getRadius()))


          return null
        }
        showMessage({
          message: "Location Error",
          description: "Unable to get location.",
          type: 'warning'
        })
      }
    })
  }
};

export const setCoords = (lat, lon) => {
  return {
    type: SETCOORDS,
    payload: [lon, lat]
  }
};
