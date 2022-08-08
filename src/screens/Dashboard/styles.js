import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    borderStartColor: AppColors.white30,
    paddingTop: height(2)
  },
  text: {
    color: AppColors.white
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: width(2),
    paddingTop: height(4)
  },
  iconView: {
    width: width(6),
    backgroundColor: AppColors.white,
    height: height(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(1),
    marginRight: width(2)
  },
  flatListContainer:{width:width(100),alignItems:'center',paddingTop:height(1)}

});
export default styles;
