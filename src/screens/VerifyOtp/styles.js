import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    paddingTop: height(2),
    alignItems: 'center',
  },

  footerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height(2.75),
  },
  otpView: {
    width: width(80),
    height: height(8),
    marginTop: height(3),
  },
  otpContainer: {
    width: width(80),
    height: height(8),
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    marginTop: height(2),
    marginBottom: height(4),
  },
  underlineStyleBase: {
    borderColor: AppColors.primary,
    borderBottomColor: AppColors.black80,
    borderBottomWidth: 2.5,
    borderWidth: 1,
    padding: 1,
    paddingVertical: 0,
    textAlignVertical: 'center',
    borderRadius: 1,
    width: totalSize(4.75),
    height: totalSize(5.75),
    fontSize: totalSize(2.25),
    color: AppColors.black50,
  },
  iconStyles:{
    height:height(15),
    width:width(25),
    resizeMode:'contain'
  }
});
export default styles;
