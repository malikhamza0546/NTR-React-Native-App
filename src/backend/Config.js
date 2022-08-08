let url = __DEV__
  ? 'https://the-ntr-dev.herokuapp.com/api/v1/'
  : 'https://the-ntr-back.herokuapp.com/api/v1/';

export const updateBaseUrl = (baseUrl = '') => (url = baseUrl);

export const BaseUrl = url;

// We'll check logged in user, if user is any from list below, we'll write fix US coords to test it properly.
export const TestEmails = ['shoaib.ahmed47564@gmail.com', 'daniyalrathore14@gmail.com', 'hussamkhan98@gmail.com']

// export const BaseUrl = 'http://192.168.18.3:5001/api/v1/';
// export const BaseUrl =  getToken();
