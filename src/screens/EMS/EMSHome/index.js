import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {width} from 'react-native-dimension';
import {Callout, Circle, Marker} from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../../assets/images';
import FilterModal from '../../../components/FilterModal';
import {HospitalHeader} from '../../../components/Header';
import HospitalCard from '../../../components/HospitalCard';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {CustomText} from '../../../components/Texts';
import {coordsSelector, setCoords} from '../../../Redux/Actions/Config';
import {
  emsRadiusSelector,
  emsSelector,
  setEmsRedius,
} from '../../../Redux/Actions/EMS';
import {certifiedBedsSelector} from '../../../Redux/Actions/Nursing';
import AppColors from '../../../utills/AppColors';
import {CommonStyles} from '../../../utills/CommonStyles';
import {
  kmsToMiles,
  milesToKms,
  radiusToLatDelta,
} from '../../../utills/Methods';
import styles from './styles';
export default function EMSHome({navigation, route}) {
  const title = route?.params?.title;
  const userInfo = useSelector(state => state.Auth.user);
  const emsRadius = useSelector(emsRadiusSelector);
  const certifiedBed = useSelector(certifiedBedsSelector);
  const [beds, setBeds] = useState(certifiedBed);
  const [radius, setHRadius] = useState([kmsToMiles(emsRadius / 1000)]);
  const EMSData = useSelector(emsSelector);
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
        latitudeDelta: radiusToLatDelta(emsRadius * 2.8),
        longitudeDelta: radiusToLatDelta(emsRadius * 2.8),
      },
      300,
    );
  };
  useEffect(() => {
    recenter();
  }, [emsRadius]);
  const HeaderComponent = useMemo(() => {
    return (
      <HospitalHeader
        image={userInfo._id}
        title={title}
        onPressFilter={toggleFilterModal}
        onPressSearch={() =>
          navigation.navigate('EMSSearch', {search: 'Search'})
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
        hospital={item?.name}
        city={item.city}
        state={item.state}
        index={index}
        distance={item.distance}
        onPress={() => navigation.navigate('EMSDetail', {emsID: item._id})}
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
          onPress={() => navigation.navigate('EMSDetail', {emsID: data._id})}>
          <View>
            <CustomText>{data?.name}</CustomText>
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
            data={EMSData}
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
              latitudeDelta: radiusToLatDelta(emsRadius * 2.8),
              longitudeDelta: radiusToLatDelta(emsRadius * 2.8),
            }}
            style={styles.map}
            showsUserLocation
            showsMyLocationButton={false}
            onUserLocationChange={({nativeEvent}) => {
              if (nativeEvent?.coordinate?.latitude) {
                const {latitude, longitude} = nativeEvent.coordinate;
                dispatch(setCoords(latitude, longitude));
              }
            }}
            maxZoomLevel={15}
            data={EMSData}
            renderMarker={renderMarker}
            renderCluster={renderCluster}>
            <Circle
              center={{latitude: coords[1], longitude: coords[0]}}
              radius={emsRadius * 1.2}
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
        onValuesChange={val => {
          setHRadius(val);
        }}
        showBedFilter={false}
        title="EMS"
        onApply={() => {
          toggleFilterModal();
          setTimeout(() => {
            dispatch(setEmsRedius({Radius: milesToKms(radius * 1000)}));
          }, 600);
        }}
        onClear={() => {
          toggleFilterModal();
          setTimeout(() => {
            dispatch(
              setEmsRedius({
                Radius: 55000,
              }),
            );
          }, 600);
          setHRadius([kmsToMiles(55000 / 1000)]);
        }}
      />
    </ScreenWrapper>
  );
}
