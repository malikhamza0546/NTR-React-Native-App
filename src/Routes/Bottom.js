import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {height, width} from 'react-native-dimension';
import {Icons} from '../assets/images';
import {CustomText, H1} from '../components/Texts';
import Home from '../screens/Home';
import Dashboard from '../screens/Dashboard';
import Map from '../screens/Map';
import Menu from '../screens/Menu';
import AppColors from '../utills/AppColors';
import Project from '../screens/Project';
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
export default function BottomTab({}) {
  const UnderDevelop = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <H1>Under Development</H1>
      </View>
    );
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        style: {
          backgroundColor: AppColors.white,
          height: height(12),
          paddingTop: height(0.5),
        },
      }}
      screenOption={{}}>
      <Tab.Screen
        name="Home"
        options={navigation => ({
          tabBarIcon: ({color, focused}) => (
            <View style={styles.tabView}>
              <Image source={Icons.home} style={styles.iconStyle} />
              <CustomText color={AppColors.black}>Home</CustomText>
              <View
                style={focused ? styles.focusedBarStyle : styles.barStyle}
              />
            </View>
          ),
        })}>
        {() => (
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Dashboard" component={Home} />
            <Stack.Screen name="Project" component={Project} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="MenuScreen"
        options={navigation => ({
          tabBarIcon: ({color, focused}) => (
            <View style={styles.tabView}>
              <Image source={Icons.menu} style={styles.iconStyle} />
              <CustomText color={AppColors.black}>Menu</CustomText>
              <View
                style={focused ? styles.focusedBarStyle : styles.barStyle}
              />
            </View>
          ),
        })}>
        {() => (
          <Stack.Navigator
            initialRouteName="Menu"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Menu" component={Menu} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  iconStyle: {
    resizeMode: 'contain',
    width: width(6),
    height: height(3),
    tintColor: AppColors.black,
  },
  tabView: {
    alignItems: 'center',
  },
  focusedBarStyle: {
    height: height(0.4),
    width: width(12),
    backgroundColor: AppColors.black,
    borderBottomEndRadius: width(4),
    borderBottomStartRadius: width(4),
    marginTop: height(0.5),
  },
  barStyle: {
    height: height(0.4),
    width: width(12),
    backgroundColor: AppColors.transparent,
    borderBottomEndRadius: width(4),
    borderBottomStartRadius: width(4),
    marginTop: height(0.5),
  },
});
