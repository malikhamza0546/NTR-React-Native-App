import {SETNURSING, SETNURSINGRADIUS} from '../Types';
const intialState = {
  Nursing: [],
  radius: 55000,
  certifiedBeds: '0',
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SETNURSING: {
      return {
        ...state,
        Nursing: action.payload,
      };
    }
    case SETNURSINGRADIUS: {
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
