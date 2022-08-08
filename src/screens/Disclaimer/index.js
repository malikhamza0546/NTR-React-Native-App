import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { BgImages } from '../../assets/images';
import Button from '../../components/Button';
import { Logo } from '../../components/Logo';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { CustomText, H1 } from '../../components/Texts';
import { WhiteContainer } from '../../components/WhiteContainer';
import AppColors from '../../utills/AppColors';
import { CommonStyles } from '../../utills/CommonStyles';
import styles from './styles';
import { HorizontalLine } from '../../components/Line'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveToken, whoAmI } from '../../Redux/Actions/Auth';
import { useDispatch } from 'react-redux';
import { setLoaderVisible } from '../../Redux/Actions/Config';
export default function Disclaimer({ navigation }) {
  const dispatch = useDispatch({ navigation })
  const CheckUser = async () => {
    dispatch(setLoaderVisible(true))
    let token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch(saveToken(JSON.parse(token)))
      dispatch(whoAmI(() => {
        navigation.replace('App')
        dispatch(setLoaderVisible(false))
      }))
      return
    }
    navigation.replace('App')
    dispatch(setLoaderVisible(false))
  }
  return (
    <ScreenWrapper
      backgroundImage={BgImages.authBg}
      backgroundColor={AppColors.black}
      transclucent
      statusBarColor={AppColors.transparent}
      barStyle="light-content">
      <View style={styles.mainViewContainer}>
        <Logo />
        <WhiteContainer height={height(80)} style={styles.whiteContainer}>
          <H1 >Disclaimer</H1>
          <HorizontalLine customWidth={width(40)} />
          <View style={styles.innerView}>
            <ScrollView style={CommonStyles.marginTop_1} showsVerticalScrollIndicator={false} >
              <CustomText size={4} fontWeight='bold'
                letterSpacing={0.5}
                lineHeight={width(6)}
                textStyles={CommonStyles.marginTop_2}>
                Acceptance:
              </CustomText>
              <HorizontalLine customWidth={width(26)} containerStyles={CommonStyles.marginBottom_1} />
              <CustomText
                size={4}
                justify
                letterSpacing={0.5}
                lineHeight={width(6)}
              >

                Your relationship with the us shall be governed by this Disclaimer, our Terms of Use, and Privacy Policy statement displayed on the App or website. By accessing and/or using the App or the Website, and our services, you accept and agree with this Disclaimer, and all our terms and conditions.
              </CustomText>
              <CustomText size={4} fontWeight='bold'
                letterSpacing={0.5}
                lineHeight={width(6)}
                textStyles={CommonStyles.marginTop_2}>
                Disclaimer:
              </CustomText>
              <HorizontalLine customWidth={width(26)} containerStyles={CommonStyles.marginBottom_1} />
              <CustomText size={4}
                justify
                letterSpacing={0.5}
                lineHeight={width(6)}>
                {'\u25CF'}	The use of this App and the Website is strictly restricted to the hospitals, their authorized staff members and emergency medical services (EMS) personnel on official duty. Protected patient information or identifiers or any other information that falls under the scope of HIPAA Act, 1996, shall never be shared within the App or with us.
                {'\n\n\u25CF'} All the information provided on this App or Site is for general informational purposes only. Such information and data is independent, being updated by the respective hospitals, their staff and ambulance operators/service providers. Information or resources seen on this App/website shall never be seen as a substitute for seeking such information directly from the concerned hospitals and ambulance operators/service providers, as the case may be.
                {'\n\n'}We only show <Text style={{ fontWeight: 'bold' }}>‘probability status’</Text> of availability of beds in hospital, and availability of ambulances, where <Text style={{ fontWeight: 'bold' }}>‘RED’</Text> signifies <Text style={{ fontWeight: 'bold' }}>‘less chance’, ‘YELLOW’</Text> signifies <Text style={{ fontWeight: 'bold' }}>‘intermediate chance’ and ‘GREEN’</Text> means a <Text style={{ fontWeight: 'bold' }}>‘good chance’</Text>. However, you must always check with the concerned hospital or EWS provider, before relying on such data. <Text style={{ fontWeight: 'bold' }}>We (National Transfer Registry) do not in any way guarantee the accuracy, reliability, completeness, current-ness and/or timeliness of any such information or data, and we assume no liability and cannot be held responsible for any errors or omissions in such information or data.</Text>
                {'\n\n\u25CF'} We are not a medical service provider, EMS, or suicide prevention helpline. If you are feeling suicidal, we would suggest you immediately call up a suicide prevention helpline or seek medical help. In case you require a medical attention or professional advice, we would suggest you to seek such medical aid, or contact the relevant professional for the same.
                {'\n\n\u25CF'}	You acknowledge and undertake that you are accessing the services at your own risk and are using your best and prudent judgment before relying on the information or data available on the App/Website. You must cross check such information with the concerned hospital or EWS provider/operator.
                {'\n\n\u25CF'}	The App/Site, our services and all information is provided on an “AS-IS” basis, and we expressly disclaim any and all warranties and conditions of any kind, whether express, implied, or statutory, including all warranties or conditions of accuracy, reliability, completeness, timeliness, safety, fitness for a particular purpose, of the same. We make no warranty that the App/Site or information available on the App/Site will meet your expectations, will be available on an uninterrupted, timely, secure, or error-free basis, or will be accurate, reliable, or complete.
                {'\n\n\u25CF'}	Under no circumstance will we be liable to you for any illness, loss of health, loss of time, medical issue, death, lost information, or data, or consequential, special, indirect, exemplary, punitive, or incidental damages arising out of or related to these terms or our services, even if we have been advised of the possibility of such damages.
              </CustomText>
              <CustomText size={4}
                // justify
                letterSpacing={0.5}
                lineHeight={width(6)}>
                Contact Us: For any query or assistance, please write us at:
              </CustomText>
              <CustomText letterSpacing={0.5}
                lineHeight={width(6)} fontWeight='bold'>
                Info@NationalTransferRegistry.com.
              </CustomText>
            </ScrollView>
          </View>
          <Button
            title="I consent"
            containerStyle={CommonStyles.marginTop_3}
            onPress={CheckUser}
          />
        </WhiteContainer>
      </View>
    </ScreenWrapper>
  );
}
