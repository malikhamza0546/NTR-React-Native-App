import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { width } from 'react-native-dimension';
import MapView, { Circle, Marker, Callout } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../assets/images';
import FilterModal from '../../components/FilterModal';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { CustomText } from '../../components/Texts';
import { coordsSelector, setCoords } from '../../Redux/Actions/Config';
import { acuteBedConditionSelector, acuteBedSelector, hospitalsSelector, orderBySelector, radiusSelector, setRadius } from '../../Redux/Actions/Hospital';
import AppColors from '../../utills/AppColors';
import { CommonStyles } from '../../utills/CommonStyles';
import { kmsToMiles, milesToKms, radiusToLatDelta } from '../../utills/Methods';
import styles from './styles';
export default function Map({ navigation }) {
    const dispatch = useDispatch()
    const mapRef = useRef(null)
    const coords = useSelector(coordsSelector)
    const radius = useSelector(radiusSelector)
    const acuteBed=useSelector(acuteBedSelector)
    const acuteBedCondition =useSelector(acuteBedConditionSelector)
    const hospitals = useSelector(hospitalsSelector)
    const orderBySort =useSelector(orderBySelector)
    const [orderBy,setOrderBy]=useState(orderBySort)
    const [hradius, setHRadius] = useState([kmsToMiles(radius / 1000)])
    const [beds, setBeds] = useState(acuteBed)
const [selectedCondition,setSelectedCondition]=useState(acuteBedCondition)
    const [showFilterModal, setShowFilterModal] = useState(false)
    const toggleFilterModal = () => setShowFilterModal(!showFilterModal)
    const recenter = () => {
        mapRef.current.animateToRegion({
            latitude: coords[1],
            longitude: coords[0],
            latitudeDelta: radiusToLatDelta(radius * 2.8),
            longitudeDelta: radiusToLatDelta(radius * 2.8),
        }, 300)
    }
    useEffect(() => {
        recenter()
    }, [radius])
    return (
        <ScreenWrapper
            transclucent
            statusBarColor={AppColors.black20}
            barStyle='dark-content'
        >
            <View style={styles.mainViewContainer}>
                <MapView
                    ref={mapRef}
                    initialRegion={{
                        latitude: coords[1],
                        longitude: coords[0],
                        latitudeDelta: radiusToLatDelta(radius * 2.8),
                        longitudeDelta: radiusToLatDelta(radius * 2.8),
                    }}
                    maxZoomLevel={15}
                    style={styles.map}
                    showsUserLocation
                    showsMyLocationButton={false}
                    onUserLocationChange={({ nativeEvent }) => {
                        if (nativeEvent?.coordinate?.latitude) {
                            const { latitude, longitude } = nativeEvent.coordinate;
                            dispatch(setCoords(latitude, longitude))
                        }
                    }}
                >
                    <Circle center={{ latitude: coords[1], longitude: coords[0] }} radius={radius * 1.2}
                        fillColor={AppColors.black20} />
                    {hospitals?.map(hospital => {
                        return <Marker key={hospital._id} coordinate={{
                            latitude: hospital.zipCoords.coordinates[1],
                            longitude: hospital.zipCoords.coordinates[0]
                        }}
                        >
                            <Image source={Icons.Dot} style={[CommonStyles.smallIcon, styles.marker]} />

                            <Callout style={{ width: width(40) }} onPress={() => navigation.navigate('HospitalDetail', { hospitalId: hospital._id })}>
                                <View >
                                    <CustomText>{hospital.name}</CustomText>
                                </View>
                            </Callout>
                        </Marker>
                    })}
                </MapView>
                <TouchableOpacity style={styles.filterIcon} onPress={toggleFilterModal}>
                    <Image source={Icons.filter} style={styles.filterImgae} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.recenterContainer} onPress={recenter}>
                    <View style={styles.blackDot} />
                </TouchableOpacity>
                <View style={styles.labelText}>
                <CustomText >Map locations are approximate</CustomText>

                </View>
            </View>
            <FilterModal
                isVisible={showFilterModal}
                values={hradius}
                bedsValue={beds}
                onChangeText={setBeds}
                onClose={toggleFilterModal}
                onValuesChange={(val) => {
                    setHRadius(val)
                }}
                orderBy={orderBy}
                onPressAsc={()=>setOrderBy(1)}
                onPressDesc={()=>setOrderBy(-1)}
                selectedTab={selectedCondition}
                onPressCondition={(item)=> setSelectedCondition(item.code)}
                onApply={() => {
                    toggleFilterModal()
                    setTimeout(() => {
                        dispatch(setRadius({Radius:milesToKms(hradius * 1000),acuteBed:beds,condition:selectedCondition,orderBy:orderBy}))
                    }, 600);
                }}
                onClear={() => {
                    toggleFilterModal()
                    setTimeout(() => {
                        dispatch(setRadius({Radius:55000,condition:'gte',
                        acuteBed:'0',orderBy:1}))
                    }, 600);
                }}
            />
        </ScreenWrapper>
    )
}