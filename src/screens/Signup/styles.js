import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  whiteContainer: {
    paddingHorizontal: width(10),
    marginTop: height(4),
  },
  avatarContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top:-height(8),
  },
  checkBoxView: {
    flexDirection: 'row',
    marginTop: height(1.5),
    justifyContent: 'space-between',
  },
  checkBoxStyle: {
    height: height(3),
    width: height(3),
    marginRight: width(0.4),
  },
});
export default styles;
