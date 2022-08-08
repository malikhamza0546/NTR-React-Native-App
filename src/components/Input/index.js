import React, {forwardRef} from 'react';
import {OutlinedTextField} from 'react-native-material-textfield';
import AppColors from '../../utills/AppColors';
import styles from './styles';

const InputCom = (
  {
    label = '?',
    keyboardType = 'default',
    formatText = val => val,
    onSubmitEditing = null,
    error = null,
    onChangeText = () => {},
    containerStyles = {},
    secureTextEntry = false,
  },
  ref,
) => {
  return (
    <OutlinedTextField
      label={label}
      keyboardType={keyboardType}
      formatText={formatText}
      onSubmitEditing={onSubmitEditing}
      ref={ref}
      onChangeText={onChangeText}
      error={error}
      inputContainerStyle={[styles.container, containerStyles]}
      tintColor={AppColors.gray}
      secureTextEntry={secureTextEntry}
    />
  );
};

export const Input = forwardRef(InputCom);
