import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
const ModalWrapper = ({ children, isVisible, onClose, containerStyle, avoidKeyboard = false }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      animationOut={'zoomOutDown'}
      animationOut={'zoomOutDown'}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      avoidKeyboard={avoidKeyboard}
      backdropOpacity={0.2}>
      <View
        style={[
          styles.modalInnerContainer,
          containerStyle ? containerStyle : {},
        ]}>
        {children}
      </View>
    </Modal>
  );
};
export default ModalWrapper;
