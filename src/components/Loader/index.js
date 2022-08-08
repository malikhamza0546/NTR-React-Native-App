import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import { width } from 'react-native-dimension';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import AppColors from '../../utills/AppColors';
import { CustomText } from '../Texts';
import styles from './styles'
export default function Loader() {
  const isLoaderVisible = useSelector((state) => state.Config.isLoaderVisible);
  return (
    <Modal isVisible={isLoaderVisible} backdropOpacity={0.4}>
      <View style = {styles.container}>
        <ActivityIndicator size="large" color={AppColors.white} />
        <CustomText size={3.7} lineHeight={width(8)} color={AppColors.white}>Loading...</CustomText>
      </View>
    </Modal>
  );
}
