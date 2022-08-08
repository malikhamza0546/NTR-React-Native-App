import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Icons} from '../../assets/images';
import AppColors from '../../utills/AppColors';
import {CustomText} from '../Texts';
import styles from './styles';
import {View} from 'react-native-animatable';
import {height, width} from 'react-native-dimension';
import {CommonStyles} from '../../utills/CommonStyles';
import {FontFamily} from '../../utills/Fontfamily';
const Button = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white,
  activeOpacity = 0.7,
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle]}>
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size="large" />
      ) : (
        <CustomText
          color={AppColors.white}
          letterSpacing={3}
          size={3.8}
          font={FontFamily.appFontSemiBold}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default Button;
export const DropDownButton = ({
  value,
  placeHolder = '',
  containerStyle,
  onPress,
  Icon = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.selectContainer, containerStyle]}
      disabled={disabled}
      onPress={onPress}>
      <CustomText
        color={value ? AppColors.black : AppColors.black40}
        size={3.8}
        numberOfLines={2}>
        {value ?? placeHolder}
      </CustomText>
      {Icon ? (
        <Image source={Icons.downArrow} style={styles.iconStyle} />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};

export const MenuButton = ({
  title,
  disabled = false,
  onPress = () => {},
  icon,
}) => {
  const containerRef = useRef(null);
  function onPressFunc() {
    containerRef.current.pulse(500);
    onPress();
  }
  return (
    <View ref={containerRef} style={menuStyles.shadow}>
      <TouchableOpacity
        style={menuStyles.container}
        onPress={onPressFunc}
        activeOpacity={0.8}
        disabled={disabled}>
        <View style={CommonStyles.rowAlignItemCenter}>
          {/* <View style={menuStyles.iconContainer}>
          <Image style={menuStyles.icon} source={icon} />
        </View> */}
          <CustomText size={3} color={AppColors.gray} letterSpacing={1}>
            {title}
          </CustomText>
        </View>
        <Image
          source={Icons.rightArrow}
          style={[CommonStyles.xSmallIcon, menuStyles.arrowRight]}
        />
      </TouchableOpacity>
    </View>
  );
};
const menuStyles = StyleSheet.create({
  shadow: {
    borderRadius: width(2),
    width: width(70),
    height: height(6),
    backgroundColor: AppColors.black10,
    paddingBottom: 1.5,
    paddingTop: 1,
    paddingHorizontal: 1,
    marginTop: height(1),
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: AppColors.white,
    borderRadius: width(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '3%',
  },
  iconContainer: {
    backgroundColor: AppColors.primary,
    borderRadius: height(1),
    padding: height(0.7),
    marginRight: width(5),
  },
  icon: {
    height: height(2.5),
    width: height(2.5),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  arrowRight: {
    transform: [{rotate: '180deg'}],
  },
});

export const ButtonWithIcon = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white,
  activeOpacity = 0.7,
  containerStyle = {},
  Icon,
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={[styles.btnIconContainer, containerStyle]}>
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size="small" />
      ) : (
        <>
          <CustomText
            color={AppColors.white}
            letterSpacing={3}
            size={3.8}
            font={FontFamily.appFontSemiBold}>
            {title}
          </CustomText>
          <Image source={Icon} style={styles.iconStyle} />
        </>
      )}
    </TouchableOpacity>
  );
};
export const ButtonCircle = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white,
  activeOpacity = 0.7,
  containerStyle = {},
  textColor,
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={[styles.circleContainer, containerStyle]}>
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size="small" />
      ) : (
        <>
          <CustomText
            color={textColor}
            letterSpacing={3}
            size={4.5}
            center
            font={FontFamily.appFontMedium}>
            {title}
          </CustomText>
        </>
      )}
    </TouchableOpacity>
  );
};
