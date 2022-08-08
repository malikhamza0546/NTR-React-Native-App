import {ApiManager} from '../../backend/ApiManager';
import store from '../index';
import {SETHOSPITAL, SETRADIUS} from '../Types';
import {getCoords, setLoaderVisible} from './Config';
export const setHospital = payload => {
  return {
    type: SETHOSPITAL,
    payload: payload,
  };
};
export const getHospitals = (
  coords,
  maxDistance = 5000,
  acuteBed = '0',
  minDistance,
) => {
  return async dispatch => {
    dispatch(setLoaderVisible(true));
    const res = await ApiManager.get('hospital/near', {
      lat: coords[1],
      lng: coords[0],
      maxDistance,
      minDistance,
      cond: `[[acuteBeds_HCRIS,$gte,${acuteBed}]]`,
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
      dispatch(setHospital(response));
    } else dispatch(setHospital([]));
    dispatch(setLoaderVisible(false));
  };
};
export const setRadius = payload => {
  return dispatch => {
    dispatch(getHospitals(getCoords(), payload.Radius, payload.acuteBed));
    dispatch({
      type: SETRADIUS,
      payload: payload,
    });
  };
};
export const hospitalsSelector = state => state.Hospital.hospitals;
export const radiusSelector = state => state.Hospital.radius;
export const getRadius = () => store.getState().Hospital.radius;
export const acuteBedSelector = state => state.Hospital.accuteBed;
export const acuteBedConditionSelector = state => state.Hospital.condition;
export const orderBySelector = state => state.Hospital.orderBy;
