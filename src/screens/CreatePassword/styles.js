import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    paddingTop: height(2),
    alignItems: 'center',
  },
  iconStyles:{
    height:height(15),
    width:width(25),
    resizeMode:'contain'
  }
});
export default styles;
