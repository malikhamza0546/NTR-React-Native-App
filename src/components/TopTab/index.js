import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {height, width} from 'react-native-dimension';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import AppColors from '../../utills/AppColors';
import {FontFamily} from '../../utills/Fontfamily';
import {CustomText} from '../Texts';
import styles from './styles';
export default function TopTab({
  text1,
  text2,
  selectedTab,
  onPress1,
  onPress2,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          selectedTab == text1 ? styles.selectedTab : styles.notSelectedTab
        }
        onPress={onPress1}>
        <CustomText
          size={4}
          lineHeight={height(6)}
          color={AppColors.black}
          font={FontFamily.appFontMedium}>
          {text1}
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress2}
        style={
          selectedTab == text2 ? styles.selectedTab : styles.notSelectedTab
        }>
        <CustomText
          size={4}
          lineHeight={height(6)}
          color={AppColors.black}
          font={FontFamily.appFontMedium}>
          {text2}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}
