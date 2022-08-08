import {ApiManager} from '../../backend/ApiManager';
import {SETEMS, SETEMSADIUS} from '../Types';
import {getCoords, setLoaderVisible} from './Config';
import store from '../index';
export const setEMS = payload => {
  return {
    type: SETEMS,
    payload: payload,
  };
};
export const getEMSData = (coords, maxDistance = 5000, minDistance) => {
  return async dispatch => {
    dispatch(setLoaderVisible(true));
    const res = await ApiManager.get('ems/near', {
      lat: coords[1],
      lng: coords[0],
      maxDistance,
      minDistance,
      cond: null,
    });
    if (res.ok) {
      let response = [];
      res?.data.map(item => {
        response.push({
          ...item,
          location: {
            latitude: item?.zipCoords?.coordinates[1],
            longitude: item?.zipCoords?.coordinates[0],
          },
        });
      });
      dispatch(setEMS(response));
    } else dispatch(setEMS([]));
    dispatch(setLoaderVisible(false));
  };
};
export const setEmsRedius = payload => {
  return dispatch => {
    dispatch(getEMSData(getCoords(), payload.Radius, payload.beds));
    dispatch({
      type: SETEMSADIUS,
      payload: payload,
    });
  };
};
export const emsSelector = state => state.EMS.EMS;
export const emsRadiusSelector = state => state.EMS.radius;
export const getEMSRadius = () => store.getState().EMS.radius;
// export const certifiedBedsSelector = state => state.EMS.certifiedBeds;

// als, $eq, true
