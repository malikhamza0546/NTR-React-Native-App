import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    cardView: {
        paddingVertical: height(2),
        paddingHorizontal: width(4),
        backgroundColor: AppColors.white,
        marginBottom: height(2),
        width: width(90),
        borderRadius: width(1.5),
        shadowColor: AppColors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
      dotView: {
        width: totalSize(1.2),
        height: totalSize(1.2),
        borderRadius: width(10),
        backgroundColor: AppColors.white,
        bottom: 10
      },
      addressDetailView: {
        width: width(90),
        backgroundColor: AppColors.white,
        borderRadius: width(2),
        paddingHorizontal: width(2),
        paddingTop: height(1),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingTop: height(1),
        elevation: 5,
        marginTop: height(1),
        // overflow:'hidden'
      },
      mapView: {
        height: height(20),
        width: width(90),
        alignSelf: 'center',
        overflow:'hidden',
      },
      phoneOpacity: {
        paddingHorizontal: width(4),
        paddingVertical: height(0.6),
        backgroundColor: AppColors.black,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width(1.6),
        // marginBottom: height(6),
        alignSelf: 'flex-end',
        // marginRight: width(8),
      },
      labelText: {
        position: 'absolute',
        zIndex:100,
        alignItems:'center',
        justifyContent:'center',
        top: height(15.5),
        left: width(13),
        backgroundColor: AppColors.white,
        paddingHorizontal: width(2),
        borderRadius: width(1),
        shadowColor: AppColors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    width:width(60),
        elevation: 5,
      },
});
export default styles;
