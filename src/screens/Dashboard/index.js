import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {height} from 'react-native-dimension';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets/images';
import {BaseUrl} from '../../backend/Config';
import Avatar from '../../components/Avatar';
import FilterModal from '../../components/FilterModal';
import HospitalCard from '../../components/HospitalCard';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText} from '../../components/Texts';
import {setLocationCoords} from '../../Redux/Actions/Config';
import {
  acuteBedConditionSelector,
  acuteBedSelector,
  hospitalsSelector,
  orderBySelector,
  radiusSelector,
  setRadius,
} from '../../Redux/Actions/Hospital';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {kmsToMiles, milesToKms} from '../../utills/Methods';
import styles from './styles';
export default function Dashboard({navigation}) {
  const userInfo = useSelector(state => state.Auth.user);
  const hospitalRadius = useSelector(radiusSelector);
  const acuteBed=useSelector(acuteBedSelector)
  const acuteBedCondition =useSelector(acuteBedConditionSelector)
  const [beds, setBeds] = useState(acuteBed)
  const orderBySort =useSelector(orderBySelector)
  const [orderBy,setOrderBy]=useState(orderBySort)
  const [selectedCondition,setSelectedCondition]=useState(acuteBedCondition)
  const [radius, setHRadius] = useState([kmsToMiles(hospitalRadius / 1000)]);
  const HospitalSearch = useSelector(hospitalsSelector);
  const profile = userInfo?.profileImage;
  const [showFilterModal, setShowFilterModal] = useState(false);
  const toggleFilterModal = () => setShowFilterModal(!showFilterModal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLocationCoords());
  }, []);
  function Header() {
    return (
      <View animation={'zoomIn'} style={styles.headerView}>
        <Avatar
          source={{uri: BaseUrl + 'user/profile-image/' + userInfo._id}}
          editButton={false}
          size={height(6)}
        />
        <CustomText
          size={4}
          textStyles={CommonStyles.paddingLeft_1}
          fontWeight="bold">
          Hospitals
        </CustomText>
        <View style={CommonStyles.rowAlignItemCenter}>
          <TouchableOpacity style={styles.iconView} onPress={toggleFilterModal}>
            <Image source={Icons.filter} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconView}
            onPress={() =>
              navigation.navigate('HospitalSearch', {search: 'Search'})
            }>
            <Image source={Icons.search} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const HeaderComponent = useMemo(Header, [profile]);
  const _renderItem = ({item, index}) => {
    return (
      <HospitalCard
        hospital={item.name}
        address={item.address}
        city={item.city}
        state={item.state}
        index={index}
        distance={item.distance}
        acuteBeds={item.acuteBeds_HCRIS}
        onPress={() =>
          navigation.navigate('HospitalDetail', {hospitalId: item._id})
        }
      />
    );
  };
  return (
    <ScreenWrapper
      statusBarColor={AppColors.transparent}
      barStyle="dark-content"
      transclucent
      headerUnScrollable={() => HeaderComponent}>
      <View style={styles.mainViewContainer}>
        <FlatList
          data={HospitalSearch}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
      <FilterModal
        isVisible={showFilterModal}
        values={radius}
        onClose={toggleFilterModal}
        bedsValue={beds}
        onChangeText={setBeds}
        selectedTab={selectedCondition}
        onPressCondition={(item)=> setSelectedCondition(item.code)}
        orderBy={orderBy}
        onPressAsc={()=>setOrderBy(1)}
        onPressDesc={()=>setOrderBy(-1)}
        onValuesChange={val => {
          setHRadius(val);
        }}
        onApply={() => {
          toggleFilterModal();
          setTimeout(() => {
            dispatch(setRadius({Radius:milesToKms(radius * 1000),acuteBed:beds,condition:selectedCondition,orderBy:orderBy}));
          }, 600);
        }}
        onClear={() => {
          toggleFilterModal();
          setTimeout(() => {
           
                        dispatch(setRadius({Radius:55000,condition:'gte',
                        acuteBed:'0',orderBy:-1}))
          }, 600);
        }}
      />
    </ScreenWrapper>
  );
}
