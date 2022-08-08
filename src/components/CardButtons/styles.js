import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  button: {
    // backgroundColor:AppColors.grey30,
    borderRadius: width(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: height(16),
    width: width(36),
    shadowColor: AppColors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: width(1),
    marginBottom: height(3),
  },
  logo: {
    resizeMode: 'contain',
    height: height(10),
    width: width(16),
  },
  disableView: {
    height: height(17),
    width: width(38),
    position: 'absolute',
    backgroundColor: AppColors.white60,
    borderRadius: width(3),
  },
});
export default styles;
