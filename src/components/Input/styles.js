import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height(6),
    width: width(80),
    alignSelf: 'center',
    backgroundColor: AppColors.white,
  },
  text: {
    color: AppColors.white,
    fontSize: width(4),
  },
});
export default styles;
