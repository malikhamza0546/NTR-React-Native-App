import {StyleSheet} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    // paddingVertical: height(1),
    alignItems: 'center',
    backgroundColor: AppColors.white,
    paddingTop: height(1),
    paddingBottom: height(8),
  },
  innerView: {
    width: width(100),
    marginTop: height(1.6),
    alignItems: 'center',
    // alignItems: 'center'
  },
  rowAlignView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width(80),
  },
  dotView: {
    width: totalSize(2.7),
    height: totalSize(2.7),
    borderWidth: width(0.8),
    borderColor: AppColors.white,
    borderRadius: width(10),
    backgroundColor: AppColors.black,
    bottom: 10,
  },
 
  notationView: {
    paddingVertical: height(1),
    width: width(90),
    backgroundColor: AppColors.white,
    borderRadius: width(2),
    paddingHorizontal: width(2.5),
    marginHorizontal: width(2),
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
    borderTopWidth: width(1.5),
  },
  comemntInnerView: {
    width: width(70),
    marginLeft: width(3),
  },
  notationButtonView: {
    // width: width(60),

    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingVertical: height(1),
  },
  buttonOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width(1.2),
    marginHorizontal: width(4),
  },
  notationHeader: {
    width: width(90),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: width(2),
  },
  downloadImg: {
    resizeMode: 'contain',
    height: height(5),
    width: width(6),
    top: 5,
  },
  addNotationButton: {
    backgroundColor: AppColors.black,
    position: 'absolute',
    bottom: height(2),
    right: width(5),
    zIndex: 10,
    borderRadius: width(4),
    paddingVertical: height(1),
    paddingHorizontal: width(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendIcon: {
    tintColor: AppColors.white,
    marginLeft: width(1),
  },
  labelText: {
    position: 'absolute',
    zIndex:100,
    alignItems:'center',
    justifyContent:'center',
    top: height(11.5),
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
    // alignItems:'center',justifyContent:'center',
    shadowRadius: 3.84,
width:width(60),
    elevation: 5,
  },
});
export default styles;
