import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
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
  blackDot: {
    height: height(2),
    width: height(2),
    borderRadius: height(1),
    backgroundColor: AppColors.black
  },
  filterIcon: {
    width: width(8),
    backgroundColor: AppColors.white,
    height: height(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(1),
    marginRight: width(2),
    position:'absolute',
    top:width(10),
    right:width(10),
    shadowColor: AppColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    
  },
  filterImgae:{
    resizeMode:'contain',
    height:height(4),
    width:width(5)
  },
  marker:{
  borderWidth:width(0.4),borderColor:AppColors.white,borderRadius:width(100)
  },
  labelText:{
    position:'absolute',
    top:width(12),
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
  }
});
export default styles;
