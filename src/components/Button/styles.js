import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(2),
    backgroundColor: AppColors.black,
    height: height(6),
    width: width(80),
    alignSelf: 'center',
  },
  selectContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: width(2),
    height: height(6),
    width: width(80),
    alignSelf: 'center',
    borderWidth: width(0.3),
    borderColor: AppColors.black30,
    borderRadius: width(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    width: width(3.6),
    height: height(4),
    resizeMode: 'contain',
  },
  btnIconContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: width(2),
    backgroundColor: AppColors.black,
    height: height(6),
    minWidth: width(35),
    paddingHorizontal: width(3),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  iconStyle: {
    resizeMode: 'contain',
    tintColor: AppColors.white,
    height: height(6),
    width: width(8),
  },
  circleContainer: {
    height: width(25),
    width: width(25),
    backgroundColor: AppColors.lightBlue,
    borderRadius: width(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
