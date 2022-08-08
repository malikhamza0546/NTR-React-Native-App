import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { BgImages } from '../../assets/images';
import SVGIcons from '../../assets/SVG';
import { ApiManager } from '../../backend/ApiManager';
import { ButtonCircle } from '../../components/Button';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { CustomText, H1 } from '../../components/Texts';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import { CommonStyles } from '../../utills/CommonStyles';
import { FontFamily } from '../../utills/Fontfamily';
import styles from './styles';
export default function CrowdSourcing({ navigation, route }) {
  const [ems, setEms] = useState([]);
  const [nextEms, setNextEms] = useState(null);
  const coords = useSelector(state => state.Config.coords);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const snapRef = useRef(null);
  useEffect(() => {
    setLoader(true);
    dispatch(setLoaderVisible(true));
    getCrowdSourcingEms();
  }, []);
  const getCrowd = async () => {
    const resp = await ApiManager.get('crowd-sourcing/ems', {
      lat: coords[1],
      lng: coords[0],
      minDistance: 1,
      maxDistance: 100000000000,
      aggresivness: 0.2,
      project: route?.params,
      cond: `[[interFacilityTransfer,'$eq','dont_know]]`,
    });
    if (resp.ok) return resp?.data;
    else return null;
  };
  const getCrowdSourcingEms = async () => {
    const resp = await Promise.all(Array.from({ length: 5 }, getCrowd));
    dispatch(setLoaderVisible(false));

    setEms(resp.filter(i => i));
    setLoader(false);
  };
  const updateEms = async type => {
    dispatch(setLoaderVisible(true));
    const resp = await ApiManager.post(
      `crowd-sourcing/ems/${ems[snapRef?.current?.currentIndex]._id}`,
      {
        type: type,
        project: route?.params,
      },
    );

    if (resp.ok) {
      let temp = [...ems];
      temp.shift();
      dispatch(setLoaderVisible(false));
      snapRef?.current?.snapToNext();
      const res = await getCrowd();
      if (res) {
        temp.push(res);
        setEms(temp);
        snapRef?.current?.snapToItem(0, false);
      } else {
        setEms(temp);
        snapRef?.current?.snapToItem(0, false);
      }
    } else dispatch(setLoaderVisible(false));
  };
  const RenderEms = ({ item, index }) => {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.cardView}
        colors={[
          '#e7efff',
          '#fafdff',
          '#fafdff',
          '#fafdff',
          '#fafdff',
          '#e7efff',
        ]}>
        <H1
          size={6.5}
          textAlign="center"
          fontFam={FontFamily.appFontSemiBold}
          color={AppColors.purple}>
          {item?.name ?? 'A-Med Hospital'}
        </H1>
        <View style={CommonStyles.marginTop_1} />
        <CustomText size={5} lineHeight={height(4)}>
          State: {item.mailingAddressState}
        </CustomText>
        <CustomText size={5} lineHeight={height(4.5)}>
          City: {item.city}
        </CustomText>
        <CustomText size={5} lineHeight={height(4.5)}>
          Zip: {item.zipCode}
        </CustomText>
        <CustomText size={5} lineHeight={height(4.5)}>
          Telephone: {item.telephone}
        </CustomText>
        <CustomText size={5} lineHeight={height(4.5)}>
          Critical Care: {item.criticalCare?.toString()}
        </CustomText>
        <CustomText size={5} lineHeight={height(4.5)}>
          ALS: {item?.als?.toString()}
        </CustomText>
        <CustomText size={5} lineHeight={height(4.5)}>
          Ground Service: {item?.ground?.toString()}
        </CustomText>
        <CustomText size={5} lineHeight={height(4.5)}>
          Air Service: {item?.air?.toString()}
        </CustomText>
      </LinearGradient>
    );
  };
  return (
    <ScreenWrapper
      backgroundImage={BgImages.gradientBG}
      transclucent
      barStyle="dark-content">
      <View style={styles.mainViewContainer}>
        <Pressable onPress={navigation.goBack}>
          <SVGIcons.whiteArrow height={height(7)} />
        </Pressable>
        {loader ? null : ems.length > 0 ? (
          <View>
            <H1
              size={6.5}
              fontFam={FontFamily.appFontSemiBold}
              center
              textAlign="center"
              color={AppColors.white}>
              Does This EMS Provide{'\n'} Inter Hospital transfer?
            </H1>
            <View style={styles.carouselContainer}>
              <Carousel
                ref={snapRef}
                data={ems}
                renderItem={RenderEms}
                sliderWidth={width(95)}
                itemWidth={width(92)}
                scrollEnabled={false}
                layoutCardOffset={'9'}
                layout="tinder"
                useScrollView
                removeClippedSubviews={false}
              // keyExtractor={(item, index) => item._id}
              />
            </View>
            <View style={styles.btnContainer}>
              <ButtonCircle
                title={'Yes'}
                textColor={AppColors.green}
                onPress={() => updateEms('yes')}
              />
              <ButtonCircle
                title={"Don't Know"}
                textColor={AppColors.yellow}
                onPress={() => updateEms('idk')}
              />
              <ButtonCircle
                title={'No'}
                textColor={AppColors.red}
                onPress={() => updateEms('no')}
              />
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <CustomText color={AppColors.white}>No Record Found</CustomText>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}
