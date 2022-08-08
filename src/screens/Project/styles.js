import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    marginTop: height(4),
  },
  pollingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: height(6),
  },
  crowdContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(2.5),
  },
  projectCard: {
    backgroundColor: AppColors.white2,
    width: width(90),
    paddingHorizontal: width(3),
    paddingTop: height(2),
    borderRadius: width(5),
    paddingBottom: height(2),
    alignItems: 'center',
    marginBottom: height(3),
    height: height(23),
  },
  rightArrow: {
    position: 'absolute',
    bottom: height(2.5),
    right: width(4),
  },
  emptyCard: {
    backgroundColor: AppColors.white2,
    width: width(90),
    paddingHorizontal: width(3),
    height: height(23),
    paddingTop: height(2),
    borderRadius: width(5),
    paddingBottom: height(2),
    alignItems: 'center',
    marginBottom: height(3),
    justifyContent: 'center',
  },
});
export default styles;
