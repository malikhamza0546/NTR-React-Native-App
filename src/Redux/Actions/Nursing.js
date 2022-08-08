import {ApiManager} from '../../backend/ApiManager';
import {SETNURSING, SETNURSINGRADIUS} from '../Types';
import {getCoords, setLoaderVisible} from './Config';
import store from '../index';
export const setNursing = payload => {
  return {
    type: SETNURSING,
    payload: payload,
  };
};
export const getNursingHomes = (
  coords,
  maxDistance = 5000,
  beds = '0',
  minDistance,
) => {
  return async dispatch => {
    dispatch(setLoaderVisible(true));
    const res = await ApiManager.get('nursing-home/near', {
      lat: coords[1],
      lng: coords[0],
      maxDistance,
      minDistance,
      cond: `[[certifiedBeds,$gte,${beds}]]`,
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
      dispatch(setNursing(response));
    } else dispatch(setNursing([]));
    dispatch(setLoaderVisible(false));
  };
};
export const setNursingRadius = payload => {
  return dispatch => {
    dispatch(getNursingHomes(getCoords(), payload.Radius, payload.beds));
    dispatch({
      type: SETNURSINGRADIUS,
      payload: payload,
    });
  };
};
export const nursingSelector = state => state.Nursing.Nursing;
export const nursingRadiusSelector = state => state.Nursing.radius;
export const getNursingRadius = () => store.getState().Nursing.radius;
export const certifiedBedsSelector = state => state.Nursing.certifiedBeds;
