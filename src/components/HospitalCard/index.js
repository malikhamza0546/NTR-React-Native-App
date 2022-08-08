import React from 'react';
import {Image, Linking, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {width} from 'react-native-dimension';
import MapView, {Marker} from 'react-native-maps';
import {Icons} from '../../assets/images';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {CustomText} from '../Texts';
import styles from './styles';

export default function HospitalCard({
  onPress,
  hospital,
  address,
  certifiedBed,
  city,
  state,
  distance,
  index = 0,
  acuteBeds,
}) {
  const tenthIndex = index % 10;
  return (
    <View
      useNativeDriver={true}
      delay={tenthIndex * 50}
      animation={'slideInRight'}
      style={styles.cardView}>
      <TouchableOpacity onPress={onPress}>
        <View style={CommonStyles.rowAlignJustifyCenterSpace}>
          <CustomText
            fontWeight="bold"
            size={3.5}
            textStyles={{width: width(70)}}>
            {hospital}
          </CustomText>
          <View style={styles.dotView} />
        </View>
        {address && (
          <View
            style={[
              {width: '90%'},
              CommonStyles.marginTop_1,
              CommonStyles.row,
            ]}>
            <CustomText fontWeight="bold" size={3}>
              Address:{' '}
            </CustomText>
            <CustomText color={AppColors.black40} size={3}>
              {address}
            </CustomText>
          </View>
        )}
        <View
          style={[CommonStyles.marginTop_1, CommonStyles.rowJustifySpaceBtw]}>
          <View style={CommonStyles.row}>
            <CustomText fontWeight="bold" size={3}>
              City:{' '}
            </CustomText>
            <CustomText color={AppColors.black40} size={3}>
              {city}
            </CustomText>
          </View>
          {state && (
            <View style={CommonStyles.row}>
              <CustomText fontWeight="bold" size={3}>
                State:{' '}
              </CustomText>
              <CustomText color={AppColors.black40} size={3}>
                {state}
              </CustomText>
            </View>
          )}
          {distance ? (
            <View style={CommonStyles.row}>
              <CustomText fontWeight="bold" size={3}>
                Distance:{' '}
              </CustomText>
              <CustomText color={AppColors.black40} size={3}>
                {distance}
              </CustomText>
            </View>
          ) : (
            <View />
          )}
        </View>
        {acuteBeds ? (
          <View style={CommonStyles.row}>
            <CustomText fontWeight="bold" size={3}>
              Acute Beds:{' '}
            </CustomText>
            <CustomText color={AppColors.black40} size={3}>
              {acuteBeds}
            </CustomText>
          </View>
        ) : certifiedBed ? (
          <View style={CommonStyles.row}>
            <CustomText fontWeight="bold" size={3}>
              Certified Beds:{' '}
            </CustomText>
            <CustomText color={AppColors.black40} size={3}>
              {certifiedBed}
            </CustomText>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
export const LabelText = ({
  label,
  text,
  textStyles = {},
  numberOfLines = null,
  textColor = AppColors.black40,
}) => {
  return (
    <View style={[CommonStyles.row, CommonStyles.marginBottom_1]}>
      <CustomText fontWeight="bold" size={3}>
        {label}{' '}
      </CustomText>
      <CustomText
        color={textColor}
        size={3}
        textStyles={textStyles}
        numberOfLines={numberOfLines}>
        {text}
      </CustomText>
    </View>
  );
};
export const DetailCard = ({
  phoneNumber,
  Beds,
  specialPayment,
  Urban,
  certifiedBed,
  als,
  bls,
  air,
  interfacilty,
}) => {
  return (
    <View animation={'zoomInUp'} style={styles.addressDetailView}>
      <View style={CommonStyles.rowAlignJustifyCenterSpace}>
        <LabelText label="Phone Number: " text={phoneNumber} />
        <TouchableOpacity
          style={styles.phoneOpacity}
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
          <CustomText color={AppColors.white} fontWeight="bold">
            Call
          </CustomText>
        </TouchableOpacity>
      </View>
      {specialPayment && (
        <LabelText label="Special Payment: " text={specialPayment} />
      )}
      {Beds && <LabelText label="Acute Beds: " text={Beds} />}
      {certifiedBed && (
        <LabelText label="Certified Beds: " text={certifiedBed} />
      )}
      {Urban && <LabelText label="Rural Urban: " text={Urban} />}
      {specialPayment && (
        <LabelText label="Special Payment: " text={specialPayment} />
      )}
      {als && <LabelText label="Advanced Life Support: " text={als} />}
      {bls && <LabelText label="Basic Life Support: " text={bls} />}
      {air && <LabelText label="Air Facility: " text={air} />}
      {interfacilty && (
        <LabelText label="InterFacility: " text={interfacilty} />
      )}
    </View>
  );
};
export const LocationCard = ({
  address,
  city,
  state,
  zipcode,
  latitude,
  longitude,
  practiceAddressState,
}) => {
  return (
    <View animation={'zoomInUp'} style={styles.addressDetailView}>
      {address && (
        <LabelText
          label="Address"
          text={address}
          textStyles={{width: width(70)}}
          numberOfLines={2}
        />
      )}

      <LabelText label="City: " text={city} />
      <LabelText label="State: " text={state} />
      {practiceAddressState && (
        <LabelText
          label="Pracitce Address State: "
          text={practiceAddressState}
        />
      )}
      <LabelText label="ZipCode: " text={zipcode} />
      <View style={styles.labelText}>
        <CustomText size={3} color={AppColors.black}>
          Map locations are approximate
        </CustomText>
      </View>
      <MapView
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.4,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        style={styles.mapView}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}>
          <Image source={Icons.Dot} style={[CommonStyles.smallIcon]} />
        </Marker>
      </MapView>
    </View>
  );
};
