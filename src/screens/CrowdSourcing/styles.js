import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // // paddingTop: height(8),
    // justifyContent: 'space-evenly',
    flex: 1,
    // paddingHorizontal: width(2),
    marginTop: height(4),
  },
  cardView: {
    width: width(92),
    borderRadius: width(6),
    height: height(54),
    paddingHorizontal: height(2),
    marginTop: height(0.8),
    shadowColor: AppColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    paddingVertical: height(2),
    overflow: 'hidden',
  },
  btnContainer: {
    width: width(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  carouselContainer: {
    marginTop: height(3),
    height: height(60),
    width: width(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  caouralStyle: {
    borderRadius: width(6),
    backgroundColor: AppColors.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
