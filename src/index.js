import React from 'react';
import Routes from './Routes/index';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './Redux/index';
import FlashMessage from 'react-native-flash-message';
import {LogBox} from 'react-native';
import AppUpdateModal from './components/AppUpdateModal';
LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="bottom" icon="auto" />
      <AppUpdateModal
        title="App Update"
        text={'New Version is available on store. Please update the App.'}
        rightBtn="UPDATE"
        showLeftBtn={false}
      />
    </Provider>
  );
}
