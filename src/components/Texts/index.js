import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import {FontFamily} from '../../utills/Fontfamily';
// import { Family } from '../../utills/Fontfamily';

export const H1 = ({
  children = '?',
  center = false,
  italic = false,
  color = AppColors.black,
  onPress = undefined,
  textStyles,
  fontFam = FontFamily.appFontRegular,
  size = 8,
  textAlign = 'auto',
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      color: color,
      fontStyle: italic ? 'italic' : 'normal',
      alignSelf: center ? 'center' : 'auto',
      fontFamily: fontFam,
      textAlign: textAlign,
    },
  });
  return (
    <Pressable disabled={typeof onPress == 'undefined'} onPress={onPress}>
      <Text style={[styles.text, textStyles ?? {}]}>{children}</Text>
    </Pressable>
  );
};

export const CustomText = ({
  children = '?',
  size = 3.3,
  fontWeight = 'normal',
  letterSpacing = 0,
  lineHeight = width(5),
  underLine,
  center,
  justify,
  right,
  italic = false,
  color = AppColors.black,
  onPress = undefined,
  textStyles,
  numberOfLines = null,
  font = FontFamily.appFontRegular,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: width(size),
      lineHeight: lineHeight,
      letterSpacing: letterSpacing,
      color: color,
      fontStyle: italic ? 'italic' : 'normal',
      textDecorationLine: underLine ? 'underline' : 'none',
      textAlign: center
        ? 'center'
        : right
        ? 'right'
        : justify
        ? 'justify'
        : 'left',
      fontFamily: fontWeight == 'bold' ? FontFamily.appFontSemiBold : font,
    },
  });
  return (
    <Pressable disabled={typeof onPress == 'undefined'} onPress={onPress}>
      <Text
        style={[styles.text, textStyles ?? {}]}
        numberOfLines={numberOfLines}>
        {children}
      </Text>
    </Pressable>
  );
};
