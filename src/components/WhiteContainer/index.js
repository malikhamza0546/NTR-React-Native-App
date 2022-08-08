import React from 'react';
import { StyleSheet } from 'react-native';
import { height as h, height, width as w, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { View } from 'react-native-animatable'

export const WhiteContainer = ({
    children,
    height = h(70),
    width = w(100),
    backgroundColor = AppColors.white,
    style = {}
}) => {
    const customStyles = { height, width, backgroundColor, ...style }
    return (
        <View animation={"slideInUp"} duration={400} style={[styles.container, customStyles]} >
            {children}
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: width(10),
        borderTopRightRadius: width(10),
        paddingVertical: height(5)
    }
})