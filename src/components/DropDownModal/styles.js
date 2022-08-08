import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainContainer: {
    width: width(95),
    borderRadius: 20,
    alignSelf: 'center',
    paddingBottom:height(2),
    paddingTop:height(1)
  },
  viewStyle: {
    width: '85%',
    alignSelf: 'center',
    paddingVertical: height(1),
    paddingLeft: width(2),
    marginTop: height(1),
    borderBottomWidth: width(0.3),
    borderBottomColor: AppColors.lightGray,
  },
  inputContainer: {
    paddingTop: height(2),
    backgroundColor: AppColors.white
  }
});
export default styles;
