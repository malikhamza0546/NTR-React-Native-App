import React from 'react';
import { StyleSheet, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

export const HorizontalLine = ({ color = AppColors.black, customWidth = '100%', strokWidth = 1, containerStyles = {} }) => {
  const styles = StyleSheet.create({
    line: {
      height: strokWidth,
      backgroundColor: color,
      width: customWidth,
      borderRadius: width(10),
      ...containerStyles
    }
  })
  return (<View style={styles.line} />)
};

export const VerticalLine = ({ color = AppColors.lightGray, customHeight = height(5), strokWidth = 1, containerStyles = {} }) => {
  const styles = StyleSheet.create({
    line: {
      alignSelf: 'center',
      width: strokWidth,
      height: customHeight,
      backgroundColor: color,
      ...containerStyles
    }
  })
  return (<View style={styles.line} />)
};