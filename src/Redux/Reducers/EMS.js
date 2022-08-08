import {SETEMS, SETEMSADIUS} from '../Types';
const intialState = {
  EMS: [],
  radius: 55000,
  certifiedBeds: '0',
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SETEMS: {
      return {
        ...state,
        EMS: action.payload,
      };
    }
    case SETEMSADIUS: {
      return {
        ...state,
        radius: action.payload.Radius,
        certifiedBeds: action.payload.beds,
      };
    }
    default:
      return state;
  }
};
export default reducer;
