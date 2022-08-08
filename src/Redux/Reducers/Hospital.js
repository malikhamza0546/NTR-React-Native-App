import { SETHOSPITAL, SETRADIUS } from '../Types';
const intialState = {
  hospitals: [],
  radius: 55000,
  accuteBed:'0',
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SETHOSPITAL: {
      return {
        ...state,
        hospitals: action.payload,
      };
    }
    case SETRADIUS: {
      return {
        ...state,
        radius: action.payload.Radius,
  acuteBed:action.payload.acuteBed,
      };
    }
    default:
      return state;
  }
};
export default reducer;
