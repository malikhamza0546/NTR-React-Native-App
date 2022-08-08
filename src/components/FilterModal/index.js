import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {Icons} from '../../assets/images';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {FontFamily} from '../../utills/Fontfamily';
import Button from '../Button';
import ModalWrapper from '../ModalWrapper';
import {CustomText} from '../Texts';
const conditons = [
  {name: 'Greater than >', code: 'gte'},
  // { name: 'Equal to ==', code: 'eq' },
  // { name: 'Less than <', code: 'lte' },
];
const FilterModal = ({
  isVisible,
  onClose,
  values = [],
  onValuesChange,
  onApply,
  onClear,
  bedsValue,
  onChangeText,
  title = 'hospital',
  bedTitle = 'Acute',
  showBedFilter = true,
}) => {
  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={onClose}
      avoidKeyboard={true}
      animationIn={'zoomInUp'}
      animationOut={'zoomOutDown'}>
      <View style={styles.modalContainer}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={onClose}>
            <Image source={Icons.CloseGrayCircle} />
          </TouchableOpacity>
          <CustomText size={4} font={FontFamily.appFontMedium}>
            Filter
          </CustomText>
          <CustomText
            color={AppColors.red}
            font={FontFamily.appFontSemiBold}
            size={3.8}
            onPress={onClear}>
            Clear
          </CustomText>
        </View>
        <View style={CommonStyles.marginTop_2}>
          <CustomText font={FontFamily.appFontSemiBold} size={4}>
            Distance
          </CustomText>
          <CustomText color={AppColors.black30} size={3.5}>
            See all {title} within the radius of:
          </CustomText>
          <MultiSlider
            enabledOne
            trackStyle={{backgroundColor: AppColors.black30}}
            selectedStyle={{backgroundColor: AppColors.black}}
            values={values}
            sliderLength={width(85)}
            onValuesChange={onValuesChange}
            min={10}
            max={1000}
            markerStyle={{
              borderColor: AppColors.black,
              height: totalSize(2),
              width: totalSize(2),
              borderWidth: width(0.4),
              marginHorizontal: width(2),
            }}
            step={1}
            snapped
          />
          <View style={CommonStyles.rowAlignJustifyCenterSpace}>
            <CustomText color={AppColors.black60}>1 miles</CustomText>
            <CustomText
              color={AppColors.black}
              font={FontFamily.appFontSemiBold}>
              {values[0]} miles
            </CustomText>

            <CustomText color={AppColors.black60}>1000 miles</CustomText>
          </View>
        </View>
        {showBedFilter && (
          <View style={styles.accuteBedView}>
            <CustomText
              font={FontFamily.appFontSemiBold}
              size={3.5}>{`Minimum Numbers of\n${bedTitle} Beds:`}</CustomText>
            <TextInput
              placeholder="0"
              style={styles.inputStyle}
              keyboardType="phone-pad"
              textAlign="center"
              value={bedsValue}
              onChangeText={onChangeText}
            />
          </View>
        )}
        <Button
          title="APPLY"
          onPress={onApply}
          containerStyle={CommonStyles.marginTop_3}
        />
      </View>
    </ModalWrapper>
  );
};
export default FilterModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    width: width(90),
    borderRadius: 20,
    alignSelf: 'center',
    paddingBottom: height(3),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: width(1),
  },
  inputStyle: {
    width: width(35),
    height: height(6),
    borderBottomWidth: width(0.4),
  },
  accuteBedView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    marginTop: height(2),
    paddingVertical: height(1),
    justifyContent: 'space-between',
  },
  selectedTab: {
    backgroundColor: AppColors.black,
    paddingVertical: height(1),
    marginRight: width(2),
    borderRadius: width(5),
    paddingHorizontal: width(4),
  },
  notSelectedTab: {
    borderColor: AppColors.black,
    paddingVertical: height(1),
    marginRight: width(2),
    borderRadius: width(5),
    paddingHorizontal: width(4),
    borderWidth: width(0.3),
  },
  dotOutline: {
    height: totalSize(2),
    width: totalSize(2),
    borderWidth: width(0.3),
    borderRadius: width(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width(3),
  },
  dotFull: {
    backgroundColor: AppColors.black,
    height: totalSize(1.4),
    width: totalSize(1.4),
    borderRadius: width(100),
  },
});
