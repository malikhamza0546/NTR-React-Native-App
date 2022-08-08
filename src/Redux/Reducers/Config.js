import { SETCOORDS, SETLOADERVISIBLE } from '../Types';
const intialState = {
  isLoaderVisible: false,
  coords: [-121.881052, 37.336133]
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SETLOADERVISIBLE: {
      return {
        ...state,
        isLoaderVisible: action.payload,
      };
    }
    case SETCOORDS: {
      return {
        ...state,
        coords: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
