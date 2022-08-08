import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  headerView: {
    paddingVertical: height(2),
    paddingHorizontal: width(4),
    backgroundColor: AppColors.white,
    width:width(100),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  heading: {
   
    paddingTop: height(6),
    alignItems:'center'

  },
  innerView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
width:width(95),
paddingLeft:width(4),
paddingBottom:height(2)

  },
  iconView: {
    width: width(8),
    backgroundColor: AppColors.white,
    height: height(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(1),
    marginRight: width(2)
  },
  tabView:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:width(1000),
    paddingTop:height(1),
    paddingBottom:height(0.3)
  }
});
export default styles;
