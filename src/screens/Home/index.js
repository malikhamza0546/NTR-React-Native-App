import React, {useEffect} from 'react';
import {View} from 'react-native-animatable';
import {height} from 'react-native-dimension';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import SVGIcons from '../../assets/SVG';
import CardButtons from '../../components/CardButtons';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText} from '../../components/Texts';
import {WhiteContainer} from '../../components/WhiteContainer';
import {setLocationCoords} from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import {FontFamily} from '../../utills/Fontfamily';
import styles from './styles';
export default function Home({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLocationCoords());
  }, []);

  return (
    <ScreenWrapper
      statusBarColor={AppColors.white}
      barStyle="dark-content"
      backgroundColor={AppColors.white}>
      <View style={styles.mainViewContainer}>
        <SVGIcons.NTRLogo height={height(12)} />
        <WhiteContainer
          height={height(68)}
          backgroundColor={AppColors.black}
          style={styles.whiteContainer}>
          <View style={styles.buttonView}>
            <CardButtons
              title={'Hospitals'}
              Icon={() => <SVGIcons.Hospital height={height(6)} />}
              onPress={() =>
                navigation.navigate('Hospitals', {title: 'Hospitals'})
              }
            />
            <CardButtons
              title="EMS"
              Icon={() => <SVGIcons.EMS height={height(6)} />}
              onPress={() => navigation.navigate('EMSHome', {title: 'EMS'})}
            />
            <CardButtons
              title={'Nursing Homes'}
              Icon={() => <SVGIcons.nursingHome height={height(5)} />}
              onPress={() =>
                navigation.navigate('NursingHome', {title: 'Nursing Homes'})
              }
            />
            <CardButtons
              title={'Behavioral Health'}
              Icon={() => <SVGIcons.BH height={height(5)} />}
              disabled
            />
            <TouchableOpacity
              style={styles.crowdBtn}
              onPress={() =>
                navigation.navigate('Project', {tab: 'Crowd Sourcing'})
              }>
              <SVGIcons.crowd height={height(8.5)} />
              <CustomText
                lineHeight={height(5)}
                size={4}
                center
                font={FontFamily.appFontSemiBold}>
                Crowd Sourcing
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.crowdBtn}
              onPress={() => navigation.navigate('Project', {tab: 'Polling'})}>
              <SVGIcons.polling height={height(8.5)} />
              <CustomText
                lineHeight={height(5)}
                size={4}
                center
                font={FontFamily.appFontSemiBold}>
                Polling
              </CustomText>
            </TouchableOpacity>
          </View>
        </WhiteContainer>
      </View>
    </ScreenWrapper>
  );
}
