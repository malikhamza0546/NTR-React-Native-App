import {LOGIN, LOGOUT, TOKEN, CLEARTOKEN} from '../Types';
const intialState = {
  user: {},
  isLogin: false,
  token: '',
  image: null,
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case LOGIN: {
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: {},
        isLogin: false,
        token: '',
        image: null,
      };
    }
    case CLEARTOKEN: {
      return {
        ...state,
        token: '',
      };
    }
    default:
      return state;
  }
};
export default reducer;
