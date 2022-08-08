import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: AppColors.white30,
  },
  text: {
    color: AppColors.white
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: width(2),
    paddingTop: height(5)
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
  flatListContainer:{width:width(100),alignItems:'center',paddingTop:height(2)},
  recenterContainer: {
    height: height(5),
    width: height(5),
    borderRadius: height(2.5),
    backgroundColor: AppColors.white,
    position: 'absolute',
    right: width(10),
    bottom: width(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AppColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }, blackDot: {
    height: height(2),
    width: height(2),
    borderRadius: height(1),
    backgroundColor: AppColors.black
  },marker:{
    borderWidth:width(0.4),borderColor:AppColors.white,borderRadius:width(100)
    },
    labelText:{
      position:'absolute',
      top:width(4),
      left:width(25),
      backgroundColor:AppColors.white,paddingHorizontal:width(2),
      borderRadius:width(1),
      shadowColor: AppColors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    clusterIconView:{
      position:'absolute',
      zIndex:10,
      right:width(3.2),top:height(0.8),

      alignItems:'center',
      justifyContent:'center'
    }
});
export default styles;
