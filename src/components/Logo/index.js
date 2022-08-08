import React from 'react';
import { Pressable } from 'react-native';
import { height } from 'react-native-dimension';
import { AppLogo } from '../../assets/images';
import { Image } from 'react-native-animatable'

export const Logo = (
  {
    black = false,
    onPress = () => { },
    imageStyles = {},
    containerStyles = {},
    size = height(15),
  },
  ref,
) => {
  const logoStyles = {
    width: size * 1.6,
    height: size,
    ...imageStyles,
  };
  return (
    <Pressable onPress={onPress} style={containerStyles}>
      <Image
        animation={"slideInDown"}
        duration={400}
        source={black ? AppLogo.transparentBlack : AppLogo.transparentWhite}
        style={logoStyles}
        resizeMode="contain"
      />
    </Pressable>
  );
};
