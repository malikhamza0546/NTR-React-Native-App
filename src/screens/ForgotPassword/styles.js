import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    paddingTop: height(2),
    alignItems: 'center',
  },
  headerView: {
    paddingVertical: height(3),
    paddingLeft: width(4),
    backgroundColor: AppColors.white,
  },
});
export default styles;
