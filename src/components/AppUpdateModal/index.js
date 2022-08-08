import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import { CustomText } from '../Texts';
import styles from './styles';
import VersionInfo from 'react-native-version-info';

const AppUpdateModal = ({ isVisible, onClose, title, text, onPress, leftBtn = 'Cancel', rightBtn = 'Ok', showLeftBtn = true }) => {
  // useEffect(() => {
  //   console.log(VersionInfo)
  // }, [])
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      animationOut={'zoomOutDown'}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.headerView}>
          <CustomText color={AppColors.white} size={4}>
            {title}
          </CustomText>
        </View>
        <View style={{ width: '80%' }}>
          <CustomText size={4} textStyles={{ textAlign: 'center' }}>{text}</CustomText>
        </View>
        <View style={styles.ButtonView}>
          {showLeftBtn && <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <CustomText color={AppColors.black30}>{leftBtn}</CustomText>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.okButton} onPress={onPress}>
            <CustomText color={AppColors.white}>{rightBtn}</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default AppUpdateModal;
