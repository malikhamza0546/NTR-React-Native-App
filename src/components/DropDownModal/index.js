import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {height} from 'react-native-dimension';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {Input} from '../Input';
import ModalWrapper from '../ModalWrapper';
import {CustomText} from '../Texts';
import styles from './styles';
const DropDownModal = ({
  isVisible,
  onChangeText,
  Search = false,
  Data = [],
  onClose,
  onPress,
  onEndReached,
  ListFooterComponent,
}) => {
  return (
    <ModalWrapper isVisible={isVisible} onClose={onClose}>
      <View style={styles.mainContainer}>
        <KeyboardAwareFlatList
          data={Data}
          ListHeaderComponent={
            Search
              ? () => (
                  <View style={styles.inputContainer}>
                    <Input label="Search" onChangeText={onChangeText} />
                  </View>
                )
              : null
          }
          style={{maxHeight: Search ? 'auto' : height(50)}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.viewStyle}
                onPress={() => onPress(item)}>
                <CustomText>
                  {item?.name}
                </CustomText>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={ListFooterComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    </ModalWrapper>
  );
};
export default DropDownModal;
