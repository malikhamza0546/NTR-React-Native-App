import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Share, Linking, Platform} from 'react-native';
import {height as h, width} from 'react-native-dimension';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {BgImages} from '../../assets/images';
import {ApiManager} from '../../backend/ApiManager';
import {BaseUrl} from '../../backend/Config';
import Avatar from '../../components/Avatar';
import {MenuButton} from '../../components/Button';
import {Logo} from '../../components/Logo';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText} from '../../components/Texts/index';
import {WhiteContainer} from '../../components/WhiteContainer';
import {logout} from '../../Redux/Actions/Auth';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import styles from './styles';
export default function Menu({navigation, route}) {
  const user = useSelector(state => state.Auth.user);
  const [appInfo, setAppInfo] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getAppInfo();
  }, []);
  const getAppInfo = async () => {
    const res = await ApiManager.get('app/info');
    if (res.ok)
      setAppInfo({
        ...res.data,
        storeLink:
          Platform.OS == 'ios' ? res.data.appStore : res.data.googlePlay,
      });
  };
  const openBrowser = url => {
    Linking.canOpenURL(url).then(supported => {
      // if (supported) {
      Linking.openURL(url);
      // } else {
      //     showMessage({
      //         message: 'Error',
      //         description: 'Unsupported url.',
      //         type: 'danger'
      //     })
      // }
    });
  };
  return (
    <ScreenWrapper
      backgroundImage={BgImages.authBg}
      backgroundColor={AppColors.black}
      transclucent
      statusBarColor={AppColors.transparent}
      barStyle="light-content">
      <View style={styles.mainViewContainer}>
        <Logo imageStyles={styles.logo} />
        <WhiteContainer style={styles.whiteContainer} height={h(70)}>
          <Avatar
            source={{uri: BaseUrl + 'user/profile-image/' + user._id}}
            containerStyle={styles.avatarContainer}
            editButton={false}
            size={h(12)}
          />
          <View style={styles.userDetailView}>
            <CustomText
              size={4}
              fontWeight="bold"
              letterSpacing={width(1)}
              lineHeight={h(4)}>
              {user.fullName}
            </CustomText>
            <CustomText size={3.7}>{user.email}</CustomText>
          </View>
          <View style={CommonStyles.marginTop_3}>
            <MenuButton
              title="Share App"
              onPress={() => {
                Share.share({
                  message:
                    '*The NTR*\n\n```The NTR allow you to view nearby hospitals and their details around you or in any point all over America.```\n\n```You can download this app from here.``` ' +
                    appInfo.storeLink,
                });
              }}
            />
            <MenuButton
              title="Privacy Policy"
              onPress={() => openBrowser(appInfo.privacypolicy)}
            />
            <MenuButton
              title="Terms & Conditions"
              onPress={() => openBrowser(appInfo.termsAndConditions)}
            />
            <MenuButton
              title="Contact Us"
              onPress={() =>
                openBrowser('mailto:info@nationaltransferregistry.com')
              }
            />
            <MenuButton
              title="Leave Us A Voice Comment"
              onPress={() => openBrowser(`tel:608-432-5232`)}
            />
            <MenuButton
              title="Visit Us"
              onPress={() =>
                openBrowser('https://nationaltransferregistry-com.webflow.io/')
              }
            />

            <MenuButton
              title="Logout"
              onPress={async () => {
                dispatch(logout());
                await AsyncStorage.removeItem('token');
              }}
            />
          </View>
        </WhiteContainer>
      </View>
    </ScreenWrapper>
  );
}
