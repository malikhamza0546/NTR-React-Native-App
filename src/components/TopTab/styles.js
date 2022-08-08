import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
const styles = StyleSheet.create({
  container: {
    width: width(95),
    alignSelf: 'center',
    backgroundColor: AppColors.purple20,
    marginVertical: height(1),
    paddingVertical: height(1),
    borderRadius: width(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  selectedTab: {
    backgroundColor: AppColors.white,
    width: width(45),
    borderRadius: width(100),
    alignItems: 'center',
  },
  notSelectedTab: {
    width: width(45),
    alignItems: 'center',
  },
});
export default styles;
