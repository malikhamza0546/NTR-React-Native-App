import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    // paddingTop: height(2),
    width:width(100),
    alignItems: 'center',
    // paddingBottom:height(4),
    backgroundColor:AppColors.white30
  },
  viewStyle: {
    width: width(85),
    alignSelf: 'center',
    paddingVertical: height(1),
    paddingLeft: width(2),
    marginTop: height(1),
    borderBottomWidth: width(0.3),
    borderBottomColor: AppColors.lightGray,
  },
  flatListContainer:{width:width(100),alignItems:'center',paddingTop:height(1),paddingBottom:height(8)}
});
export default styles;
