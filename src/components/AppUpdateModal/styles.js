import {StyleSheet} from 'react-native';
import {width, height, totalSize} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  modalInnerContainer: {
    backgroundColor: AppColors.white,
    borderRadius: width(2),
    paddingBottom: height(1),
    alignItems: 'center',
    width: width(90),
    justifyContent: 'space-between',
    height: height(20),
    // height: height(10),
  },
  headerView: {
    backgroundColor: AppColors.black,
    width: width(90),
    borderTopRightRadius: width(2),
    borderTopLeftRadius: width(2),
    alignItems: 'center',
    paddingVertical: height(1),
  },
  okButton: {
    backgroundColor: AppColors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height(0.5),

    paddingHorizontal: width(10),
  },
  ButtonView: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: width(4),
    alignItems: 'center',
    // paddingVertical: height(1),
  },
  cancelButton: {
    marginHorizontal: width(7),
  },
  
});
export default styles;
