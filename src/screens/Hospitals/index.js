import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {width} from 'react-native-dimension';
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets/images';
import FilterModal from '../../components/FilterModal';
import {HospitalHeader} from '../../components/Header';
import HospitalCard from '../../components/HospitalCard';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText} from '../../components/Texts';
import {coordsSelector, setCoords} from '../../Redux/Actions/Config';
import {
  acuteBedSelector,
  hospitalsSelector,
  radiusSelector,
  setRadius,
} from '../../Redux/Actions/Hospital';
import ClusteredMapView from 'react-native-maps-super-cluster';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {kmsToMiles, milesToKms, radiusToLatDelta} from '../../utills/Methods';
import styles from './styles';
export default function Hospitals({navigation, route}) {
  const title = route?.params?.title;
  const userInfo = useSelector(state => state.Auth.user);
  const hospitalRadius = useSelector(radiusSelector);
  const acuteBed = useSelector(acuteBedSelector);
  const [beds, setBeds] = useState(acuteBed);
  const [radius, setHRadius] = useState([kmsToMiles(hospitalRadius / 1000)]);
  const Hospitals = useSelector(hospitalsSelector);
  const mapRef = useRef(null);
  const coords = useSelector(coordsSelector);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const toggleFilterModal = () => setShowFilterModal(!showFilterModal);
  const dispatch = useDispatch();
  const [tabFocused, setTabFocused] = useState(true);

  const recenter = () => {
    mapRef?.current?.getMapRef()?.animateToRegion(
      {
        latitude: coords[1],
        longitude: coords[0],
        latitudeDelta: radiusToLatDelta(hospitalRadius * 2.8),
        longitudeDelta: radiusToLatDelta(hospitalRadius * 2.8),
      },
      300,
    );
  };
  useEffect(() => {
    recenter();
  }, [hospitalRadius]);
  const HeaderComponent = useMemo(() => {
    return (
      <HospitalHeader
        image={userInfo._id}
        title={title}
        onPressFilter={toggleFilterModal}
        onPressSearch={() =>
          navigation.navigate('HospitalSearch', {search: 'Search'})
        }
        focused={tabFocused}
        onPressTab1={() => setTabFocused(true)}
        onPressTab2={() => setTabFocused(false)}
        onBack={() => navigation.goBack()}
      />
    );
  }, [tabFocused]);

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
  const renderMarker = data => {
    return (
      <Marker key={data?._id} coordinate={data?.location}>
        <Image
          source={Icons.Dot}
          style={[CommonStyles.smallIcon, styles.marker]}
        />

        <Callout
          style={{width: width(40)}}
          onPress={() =>
            navigation.navigate('HospitalDetail', {
              hospitalId: data._id,
            })
          }>
          <View>
            <CustomText>{data.name}</CustomText>
          </View>
        </Callout>
      </Marker>
    );
  };
  const renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate;
    return (
      <Marker onPress={onPress} coordinate={coordinate}>
        <View style={styles.clusterIconView}>
          <CustomText color={AppColors.white} style={styles.myClusterTextStyle}>
            {pointCount}
          </CustomText>
        </View>
        <Image
          source={Icons.Dot}
          style={[CommonStyles.largeIcon, styles.marker]}
        />

        <Callout style={{width: width(40)}}></Callout>
      </Marker>
    );
  };
  return (
    <ScreenWrapper
      statusBarColor={AppColors.transparent}
      barStyle="dark-content"
      transclucent
      headerUnScrollable={() => HeaderComponent}>
      {tabFocused ? (
        <View style={styles.mainViewContainer}>
          <FlatList
            data={Hospitals}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      ) : (
        <View style={styles.mainViewContainer}>
          <ClusteredMapView
            ref={mapRef}
            initialRegion={{
              latitude: coords[1],
              longitude: coords[0],
              latitudeDelta: radiusToLatDelta(hospitalRadius * 2.8),
              longitudeDelta: radiusToLatDelta(hospitalRadius * 2.8),
            }}
            maxZoomLevel={15}
            style={styles.map}
            showsUserLocation
            showsMyLocationButton={false}
            onUserLocationChange={({nativeEvent}) => {
              if (nativeEvent?.coordinate?.latitude) {
                const {latitude, longitude} = nativeEvent.coordinate;
                dispatch(setCoords(latitude, longitude));
              }
            }}
            data={Hospitals}
            renderMarker={renderMarker}
            renderCluster={renderCluster}>
            <Circle
              center={{latitude: coords[1], longitude: coords[0]}}
              radius={hospitalRadius * 1.2}
              fillColor={AppColors.black20}
            />
          </ClusteredMapView>

          <TouchableOpacity style={styles.recenterContainer} onPress={recenter}>
            <View style={styles.blackDot} />
          </TouchableOpacity>
          <View style={styles.labelText}>
            <CustomText>Map locations are approximate</CustomText>
          </View>
        </View>
      )}

      <FilterModal
        isVisible={showFilterModal}
        values={radius}
        onClose={toggleFilterModal}
        bedsValue={beds}
        onChangeText={setBeds}
        onValuesChange={val => {
          setHRadius(val);
        }}
        onApply={() => {
          toggleFilterModal();
          setTimeout(() => {
            dispatch(
              setRadius({
                Radius: milesToKms(radius * 1000),
                acuteBed: beds,
              }),
            );
          }, 600);
        }}
        onClear={() => {
          toggleFilterModal();
          setTimeout(() => {
            dispatch(
              setRadius({
                Radius: 55000,
                acuteBed: '0',
              }),
            );
          }, 600);
          setBeds('0');
          setHRadius([kmsToMiles(55000 / 1000)]);
        }}
      />
    </ScreenWrapper>
  );
}
