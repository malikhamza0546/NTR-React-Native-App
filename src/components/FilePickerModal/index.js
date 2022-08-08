import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { Icons } from '../../assets/images';
import AppColors from '../../utills/AppColors';
import { CommonStyles } from '../../utills/CommonStyles';
const FilePickerModal = (
  { onFilesSelected, pickFromCamera = true, pickFromGallery = true },
  ref,
) => {
  const [isVisible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    show: function () {
      setVisible(true);
    },
    hide: function () {
      setVisible(false);
    },
    cleanTempImages: () => {
      ImagePicker.clean()
        .then(() => {
          console.log('removed all tmp images from tmp directory');
        })
        .catch(console.log);
    },
  }));
  function openCamera() {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 0.01,
      includeBase64: true
    }).then(image => onFilesSelected([image]));
  }
  function openGallery() {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 0.1,
      height: 400, width: 400,
      includeBase64: true
    }).then(onFilesSelected);
  }
  function openPicker(type = 0) {
    setVisible(false);
    setTimeout(type == 0 ? openCamera : openGallery, 400);
  }
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'zoomInUp'}
      animationOut={'zoomOutDown'}>
      <View style={styles.imageModalContainer}>
        <TouchableOpacity
          style={styles.closeContainer}
          onPress={() => setVisible(false)}>
          <Image
            source={Icons.CloseGrayCircle}
            style={CommonStyles.mediumIcon}
          />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          {pickFromCamera && (
            <TouchableOpacity
              style={styles.picOption}
              onPress={() => openPicker(0)}>
              <Image source={Icons.camera} style={CommonStyles.largeIcon} />
              <Text style={styles.picOptionText}>Take Photo</Text>
            </TouchableOpacity>
          )}
          <View style={styles.line} />
          {pickFromGallery && (
            <TouchableOpacity
              style={styles.picOption}
              onPress={() => openPicker(1)}>
              <Image source={Icons.gallery} style={CommonStyles.largeIcon} />
              <Text style={styles.picOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};
export default forwardRef(FilePickerModal);

const styles = StyleSheet.create({
  imageModalContainer: {
    backgroundColor: 'white',
    width: width(70),
    borderRadius: 20,
    alignSelf: 'center',
    paddingBottom: height(3),
  },
  closeContainer: {
    width: width(70),
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginTop: width(4),
    justifyContent: 'space-between',
    paddingHorizontal: width(4),
  },
  buttonContainer: {
    width: width(70),
    height: height(15),
    justifyContent: 'space-evenly',
  },
  picOption: {
    paddingLeft: width(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
  picOptionText: {
    marginLeft: width(2),
    fontSize: width(4),
    color: AppColors.black90,
  },
  line: {
    width: '70%',
    alignSelf: 'center',
    backgroundColor: 'gray',
    height: 0.5,
  },
});
