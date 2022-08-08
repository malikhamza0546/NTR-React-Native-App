import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppColors from '../../utills/AppColors';
import UserImage from '../../assets/images/Icons/user.png';
import { Icons } from '../../assets/images';
export default Avatar = ({
  source,
  size = 130,
  editButton = true,
  editButtonComponent,
  onEditPress,
  avatarStyle,
  editButtonStyle,
  containerStyle = {},
}) => {
  const styles = StyleSheet.create({
    containerStyle: {
      height: size,
      width: size,
      overflow: 'hidden',
    },
    imageContainer: {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderColor: AppColors.white,
      // borderWidth: 1,
      backgroundColor: AppColors.white100,
    },
    editButtonContainer: {
      height: size / 3.5,
      width: size / 3.5,
      borderRadius: size / 2,
      backgroundColor: AppColors.black90,
      position: 'absolute',
      bottom: 4,
      right: 8,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Image
        source={source ?? Icons.UserImage}
        style={[styles.imageContainer, avatarStyle ?? {}]}
      />
      {editButton && (
        <TouchableOpacity
          onPress={onEditPress}
          style={[styles.editButtonContainer, editButtonStyle ?? {}]}>
          <Image source={Icons.edit} />
        </TouchableOpacity>
      )}
    </View>
  );
};
