import React from 'react';
import {TouchableOpacity} from 'react-native';
import {height} from 'react-native-dimension';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../../utills/AppColors';
import {FontFamily} from '../../utills/Fontfamily';
import {CustomText} from '../Texts';
import styles from './styles';
const CardButtons = ({title, onPress, Logo, disabled, Icon = () => null}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled}>
      <LinearGradient
        colors={[
          '#6a6a6a',
          '#3a3a3a',
          '#2b2b2b',
          '#2b2b2b',
          '#2b2b2b',
          '#3a3a3a',
          '#6a6a6a',
        ]}
        style={styles.button}>
        {Icon()}
        <CustomText
          lineHeight={height(3)}
          size={4.5}
          color={AppColors.white}
          font={FontFamily.appFontMedium}
          center>
          {title}
        </CustomText>
        {disabled ? (
          <CustomText color={AppColors.white} size={2}>
            Comming Soon
          </CustomText>
        ) : null}
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default CardButtons;
