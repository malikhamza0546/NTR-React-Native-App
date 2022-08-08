import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: height(8),
  },
  whiteContainer: {
    paddingHorizontal: width(10),
    marginTop: height(6),
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -height(5),
  },
  userDetailView: {
    alignItems: 'center',
    marginTop: height(2),
  },
  buttonStyles: {
    backgroundColor: AppColors.black,
    width: width(30),
    height: height(10),
    borderRadius: width(4),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logo: {
    resizeMode: 'contain',
    // backgroundColor:'red',
    height: height(7),
  },
});
export default styles;
