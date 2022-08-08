import React from 'react';
import {Image, Pressable, TouchableOpacity, View} from 'react-native';
import {Icons} from '../../assets/images';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {HorizontalLine} from '../Line';
import {CustomText} from '../Texts';
import styles from './styles';
import {height} from 'react-native-dimension';
const Header = ({onPress = undefined, title}) => {
  return (
    <View style={styles.headerView}>
      <Pressable onPress={onPress}>
        <Image source={Icons.rightArrow} />
      </Pressable>
      {title && (
        <CustomText fontWeight="bold" size={4}>
          {title}
        </CustomText>
      )}

      <View />
    </View>
  );
};
export default Header;
export const HospitalHeader = ({
  image,
  title,
  onBack,
  onPressFilter,
  onPressSearch,
  focused,
  onPressTab1,
  onPressTab2,
}) => {
  return (
    <View style={styles.heading}>
      <View animation={'zoomIn'} style={styles.innerView}>
        <Pressable onPress={onBack}>
          <Image source={Icons.rightArrow} />
        </Pressable>
        <View style={CommonStyles.rowAlignItemCenter}>
          <TouchableOpacity style={styles.iconView} onPress={onPressFilter}>
            <Image source={Icons.filter} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconView} onPress={onPressSearch}>
            <Image source={Icons.search} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabView}>
        <TouchableOpacity onPress={onPressTab1}>
          <CustomText
            fontWeight="bold"
            lineHeight={height(3.5)}
            size={3.5}
            color={focused ? AppColors.black : AppColors.black30}
            textStyles={{textTransform: 'uppercase'}}>
            {`    ${title}    `}
          </CustomText>
          {focused && <HorizontalLine strokWidth={2} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTab2}>
          <CustomText
            fontWeight="bold"
            lineHeight={height(3.5)}
            size={3.5}
            color={!focused ? AppColors.black : AppColors.black30}
            textStyles={{textTransform: 'uppercase'}}>
            {`    Map    `}
          </CustomText>
          {!focused && <HorizontalLine strokWidth={2} />}
        </TouchableOpacity>
      </View>
      <HorizontalLine color={AppColors.black20} />
    </View>
  );
};
