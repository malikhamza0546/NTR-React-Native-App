import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    height:height(100)+height(5),

    paddingTop: height(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  whiteContainer: {
    paddingHorizontal: width(10),
    marginTop: height(6),
  },
  innerView:{height:height(50)}
});
export default styles;
