import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { ApiManager } from '../../backend/ApiManager';
import AppColors from '../../utills/AppColors';
import { CommonStyles } from '../../utills/CommonStyles';
import { errorMessage, successMessage } from '../../utills/Methods';
import Button from '../Button';
import ModalWrapper from '../ModalWrapper';
import { CustomText, H1 } from '../Texts';
import styles from './styles';
const ConfirmationModal = ({ isVisible, onClose, title, text, onPress,leftBtn='Cancel',rightBtn='Ok',showLeftBtn =true }) => {
  
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      animationOut={'zoomOutDown'}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.headerView}>
          <CustomText color={AppColors.white} size={4}>
            {title}
          </CustomText>
        </View>
        <View style={{width:'80%'}}>
        <CustomText size={4} textStyles={{textAlign:'center'}}>{text}</CustomText>
        </View>
        <View style={styles.ButtonView}>
        {showLeftBtn&&  <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <CustomText color={AppColors.black30}>{leftBtn}</CustomText>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.okButton} onPress={onPress}>
            <CustomText color={AppColors.white}>{rightBtn}</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default ConfirmationModal;
const ModalInput = (
  { isVisible, onClose, onSubmit = () => { }, hospitalId,type='hospital' },
  ref,
) => {
  const [note, setNote] = useState({ id: null, val: '' });
  const [isLoading, setLoading] = useState(false);
  useImperativeHandle(ref, () => ({
    setNote: setNote,
    clearNoet: () => setNote({ id: null, val: '' }),
  }));
  const submit = async () => {
    setLoading(true);
    if (note.id) {
      let url = type=='hospital'?'notes':type=='nursing'?'nursing-home-notes':'ems-notes'
      const Response = await ApiManager.patch(
        `${url}/${hospitalId}/${note.id}`,
        {
          note: note.val,
        },
      );
      if (Response.ok) {
        onSubmit({ ...Response.data, id: note.id });
        successMessage('Note updated successfully');
      } else {
        errorMessage(Response.error.error ?? 'Something went wrong');
      }
    } else {
      // 
      let url =type=='hospital'?'notes':type=='nursing'?'nursing-home-notes':'ems-notes'
      const Response = await ApiManager.post(`${url}/${hospitalId}`, {
        note: note.val,
      });
      if (Response.ok) {
        onSubmit(Response.data);
        successMessage('Note added successfully');
      } else {
        errorMessage(Response.error.error ?? 'Something went wrong');
      }
    }
    setLoading(false);
    setNote({ id: null, val: '' });
    onClose();
  };
  return (
    <ModalWrapper isVisible={isVisible} avoidKeyboard onClose={onClose}>
      <View style={styles.mainContainer}>
        <H1 textStyles={CommonStyles.marginBottom_3}>Note</H1>
        <TextInput
          placeholder="Write Note "
          multiline={true}
          value={note.val}
          onChangeText={val => setNote({ ...note, val })}
          style={styles.input}
          textAlignVertical="top"
        />
        <Button
          title={note.id ? 'EDIT NOTE' : 'ADD NOTE'}
          containerStyle={CommonStyles.marginTop_3}
          onPress={() => {
            if (note.val != '') {
              submit();
            } else errorMessage('Please write note.');
          }}
          isLoading={isLoading}
        />
      </View>
    </ModalWrapper>
  );
};
export const NotationInputModal = forwardRef(ModalInput);
