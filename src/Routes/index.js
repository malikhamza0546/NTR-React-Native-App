import remoteConfig from '@react-native-firebase/remote-config';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import VersionInfo from 'react-native-version-info';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {setBaseUrl} from '../backend/ApiManager';
import Loader from '../components/Loader';
import CreatePassword from '../screens/CreatePassword';
import CrowdSourcing from '../screens/CrowdSourcing';
import Disclaimer from '../screens/Disclaimer';
import EMSDetail from '../screens/EMS/EMSDetail';
import EMSHome from '../screens/EMS/EMSHome';
import EMSSearch from '../screens/EMS/EMSSearch';
import ForgotPassword from '../screens/ForgotPassword';
import HospitalDetail from '../screens/HospitalDetail';
import Hospitals from '../screens/Hospitals';
import HospitalSearch from '../screens/HospitalSearch';
import Login from '../screens/Login';
import NursingHome from '../screens/NursingHome';
import NursingHomeDetail from '../screens/NursingHomeDetail';
import NursingSearch from '../screens/NursingSearch';
import Signup from '../screens/Signup';
import VerifyOtp from '../screens/VerifyOtp';
import AppColors from '../utills/AppColors';
import {checkUserSession, shouldShowDisclaimer} from '../utills/Methods';
import BottomTab from './Bottom';

const MyTheme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    background: AppColors.black,
  },
};
const Stack = createStackNavigator();

export default function Routes() {
  const isLogin = useSelector(state => state.Auth.isLogin);
  const [disclaimerVisible, setDisclaimerVisible] = useState(2);

  useEffect(() => {
    getRemooteConfigData();
  }, []);
  const getRemooteConfigData = async () => {
    await remoteConfig().fetch(0);
    const versionName = `URLv${VersionInfo.appVersion.split('.').join('')}${
      VersionInfo.buildVersion
    }`;
    remoteConfig()
      .setDefaults({
        BaseUrl: 'https://the-ntr-back.herokuapp.com/api/v1/',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(activate => {
        if (activate || Platform.OS == 'android') {
          const baseurl = remoteConfig().getValue(versionName);
          if (baseurl?._value == '') {
            const url = remoteConfig().getValue('BaseUrl');
            setBaseUrl(url?._value);
          } else setBaseUrl(baseurl?._value);
          checkAppStatus();
        } else {
          setBaseUrl('https://the-ntr-back.herokuapp.com/api/v1/');
          checkAppStatus();
        }
      })
      .catch(error => {
        setBaseUrl('https://the-ntr-back.herokuapp.com/api/v1/');
        checkAppStatus();
      });
  };
  const checkAppStatus = async () => {
    let resp = await shouldShowDisclaimer();
    setDisclaimerVisible(resp);
    if (resp == 0) await checkUserSession();
    else SplashScreen.hide();
  };

  if (disclaimerVisible == 2) return null;
  else
    return (
      <NavigationContainer theme={MyTheme}>
        <Loader />
        <Stack.Navigator headerMode="none">
          {disclaimerVisible == 1 && (
            <Stack.Screen name="Disclaimer" component={Disclaimer} />
          )}
          <Stack.Screen name="App">
            {!isLogin
              ? () => (
                  <Stack.Navigator initialRouteName="Login" headerMode="none">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen
                      name="ForgotPassword"
                      component={ForgotPassword}
                    />
                    <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
                    <Stack.Screen
                      name="CreatePassword"
                      component={CreatePassword}
                    />
                    <Stack.Screen
                      name="HospitalSearch"
                      component={HospitalSearch}
                    />
                    <Stack.Screen
                      name="NursingSearch"
                      component={NursingSearch}
                    />
                    <Stack.Screen name="EMSSearch" component={EMSSearch} />
                  </Stack.Navigator>
                )
              : () => (
                  <Stack.Navigator
                    initialRouteName="BottomTab"
                    headerMode="none">
                    <Stack.Screen name="BottomTab" component={BottomTab} />
                    <Stack.Screen name="Hospitals" component={Hospitals} />
                    <Stack.Screen name="NursingHome" component={NursingHome} />
                    <Stack.Screen name="EMSHome" component={EMSHome} />
                    <Stack.Screen
                      name="HospitalDetail"
                      component={HospitalDetail}
                    />
                    <Stack.Screen
                      name="HospitalSearch"
                      component={HospitalSearch}
                    />
                    <Stack.Screen name="EMSDetail" component={EMSDetail} />
                    <Stack.Screen
                      name="NursingHomeDetail"
                      component={NursingHomeDetail}
                    />
                    <Stack.Screen
                      name="NursingSearch"
                      component={NursingSearch}
                    />
                    <Stack.Screen
                      name="CrowdSourcing"
                      component={CrowdSourcing}
                    />
                    <Stack.Screen name="EMSSearch" component={EMSSearch} />
                  </Stack.Navigator>
                )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
}
