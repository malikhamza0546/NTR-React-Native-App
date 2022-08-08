import React, {useEffect, useState} from 'react';
import {View, Pressable, TouchableOpacity, FlatList} from 'react-native';
import {height} from 'react-native-dimension';
import {useDispatch} from 'react-redux';
import {BgImages} from '../../assets/images';
import SVGIcons from '../../assets/SVG';
import {ApiManager} from '../../backend/ApiManager';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText, H1} from '../../components/Texts';
import TopTab from '../../components/TopTab';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {FontFamily} from '../../utills/Fontfamily';
import styles from './styles';
export default function Project({navigation, route}) {
  const [selectedTab, setSelectedTab] = useState(route?.params?.tab ?? '');
  const [project, setProjects] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoaderVisible(true));
    getProjectList();
  }, []);
  const getProjectList = async () => {
    const response = await ApiManager.get('/project', {type: 'crowdsource'});
    if (response.ok) setProjects(response?.data);
    dispatch(setLoaderVisible(false));
  };
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.projectCard}
        onPress={() => navigation.navigate('CrowdSourcing', item?._id)}>
        <CustomText
          size={6}
          lineHeight={height(6)}
          font={FontFamily.appFontSemiBold}
          color={AppColors.purple}>
          {item.name}
        </CustomText>
        <CustomText
          size={5}
          lineHeight={height(4)}
          center
          font={FontFamily.appFontMedium}
          numberOfLines={3}
          textStyles={CommonStyles.paddingHorizontal_3}
          color={AppColors.black}>
          Provide information on a list of EMS that provide inter hospital
          transfers.
        </CustomText>
        <View style={styles.rightArrow}>
          <CustomText
            font={FontFamily.appFontBold}
            size={6}
            lineHeight={height(5)}>{`>`}</CustomText>
        </View>
      </TouchableOpacity>
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
        <TopTab
          text1="Crowd Sourcing"
          text2="Polling"
          selectedTab={selectedTab}
          onPress1={() => setSelectedTab('Crowd Sourcing')}
          onPress2={() => setSelectedTab('Polling')}
        />
        {selectedTab == 'Crowd Sourcing' ? (
          <View style={styles.crowdContainer}>
            <FlatList
              data={project}
              renderItem={_renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <View style={styles.pollingContainer}>
            <H1 fontFam={FontFamily.appFontSemiBold} color={AppColors.white}>
              No Poll Yet!
            </H1>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}
