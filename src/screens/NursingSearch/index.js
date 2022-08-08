import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {ApiManager} from '../../backend/ApiManager';
import Header from '../../components/Header';
import HospitalCard from '../../components/HospitalCard';
import {Input} from '../../components/Input';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText} from '../../components/Texts';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {FontFamily} from '../../utills/Fontfamily';
import styles from './styles';
export default function NursingSearch({navigation, route}) {
  const screenCheck = route?.params?.search ?? null;
  const isLogin = useSelector(state => state.Auth.isLogin);
  const [search, setSearch] = useState('');
  const [nursingData, setNursingData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoaderVisible(true));
    getNursingHomes(search, 1);
  }, []);
  const getNursingHomes = async (srch, page) => {
    let response = await ApiManager.get('nursing-home/all/names', {
      limit: 15,
      sort: 'desc',
      search: srch,
      page: page,
    });
    if (response?.ok) {
      if (nextPage == null) {
        setNextPage(response.data.nextPage);
        setNursingData(response?.data?.docs);
      } else if (response?.data?.page == 1) {
        setNextPage(response.data.nextPage);

        setNursingData(response?.data?.docs);
      } else {
        let tempData = [...nursingData, ...response?.data?.docs];
        setNextPage(response.data.nextPage);
        setNursingData(tempData);
      }
      dispatch(setLoaderVisible(false));
    } else {
      dispatch(setLoaderVisible(false));

      showMessage({
        message: 'Error',
        description: 'Error while fetching the nursing homes.',
        type: 'danger',
      });
    }
  };
  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      barStyle="dark-content"
      headerUnScrollable={() => (
        <Header
          title="Search Nursing Home  "
          onPress={() => navigation.goBack()}
        />
      )}>
      <View style={styles.mainViewContainer}>
        <Input
          label="Search"
          value={search}
          onChangeText={value => {
            clearTimeout(window.changeInterval);
            window.changeInterval = setTimeout(() => {
              getNursingHomes(value, 1);
            }, 1200);
            setSearch(value);
          }}
        />

        <FlatList
          data={nursingData}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return isLogin ? (
              <HospitalCard
                hospital={item.name}
                address={item.address}
                city={item.city}
                state={item.state}
                index={index}
                distance={item.distance}
                certifiedBed={item.certifiedBeds}
                onPress={() =>
                  navigation.navigate('NursingHomeDetail', {
                    nursingId: item._id,
                  })
                }
              />
            ) : (
              <TouchableOpacity
                style={styles.viewStyle}
                onPress={() => {
                  navigation.navigate('Signup', {organization: item});
                }}>
                <CustomText>{item?.name}</CustomText>
                <View style={CommonStyles.rowAlignItemCenter}>
                  <CustomText font={FontFamily.appFontSemiBold}>
                    City:{' '}
                  </CustomText>
                  <CustomText>{item?.city}</CustomText>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => {
            return nextPage != null && screenCheck == 'Search' ? (
              <View style={CommonStyles.marginTop_1}>
                <ActivityIndicator color={AppColors.black} size={'small'} />
              </View>
            ) : search == '' && screenCheck == 'Signin' ? (
              <View style={CommonStyles.marginTop_2}>
                <CustomText>
                  Explore more nursing homes by searching...
                </CustomText>
              </View>
            ) : nextPage == null && search != '' && screenCheck == 'Signin' ? (
              <TouchableOpacity
                style={styles.viewStyle}
                onPress={() => {
                  let temp = {
                    name: 'Facility/Agency Not Listed',
                    _id: '00d00d00d0ddd00000ddd000',
                  };
                  navigation.navigate('Signup', {organization: temp});
                }}>
                <CustomText>{'Facility/Agency Not Listed'}</CustomText>
              </TouchableOpacity>
            ) : null;
          }}
          onEndReached={() => {
            if (screenCheck == 'Search') {
              if (nextPage != null) {
                getNursingHomes(search, nextPage);
              }
            } else if (search != '' && nextPage != null) {
              getNursingHomes(search, nextPage);
            }
          }}
          onEndReachedThreshold={0.5}
        />
      </View>
    </ScreenWrapper>
  );
}
