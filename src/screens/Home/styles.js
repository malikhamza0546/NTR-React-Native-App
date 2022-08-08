import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderStartColor: AppColors.white,
    paddingTop: height(2.5),
  },
  whiteContainer: {
    // paddingHorizontal: width(10),
    marginTop: height(4),
    alignItems: 'center',
  },
  buttonView: {
    width: width(80),
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  crowdBtn: {
    backgroundColor: AppColors.white,
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
    marginTop: height(1.6),
  },
});
export default styles;
