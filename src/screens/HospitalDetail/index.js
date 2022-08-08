import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Share,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native-animatable';
import {height, width} from 'react-native-dimension';
import {showMessage} from 'react-native-flash-message';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../assets/images';
import {ApiManager} from '../../backend/ApiManager';
import {BaseUrl} from '../../backend/Config';
import Avatar from '../../components/Avatar';
import ConfirmationModal, {
  NotationInputModal,
} from '../../components/ConfirmationModal';
import Header from '../../components/Header';
import {DetailCard, LocationCard} from '../../components/HospitalCard';
import {HorizontalLine} from '../../components/Line';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CustomText} from '../../components/Texts';
import {setLoaderVisible} from '../../Redux/Actions/Config';
import AppColors from '../../utills/AppColors';
import {CommonStyles} from '../../utills/CommonStyles';
import {errorMessage, successMessage} from '../../utills/Methods';
import styles from './styles';
var RNFS = require('react-native-fs');

export default function HospitalDetail({navigation, route}) {
  const NotationInputRef = useRef();

  const hospitalId = route?.params?.hospitalId;
  const myInfo = useSelector(state => state.Auth.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notations, setNotations] = useState([]);
  const [hospital, setHospital] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isRefersh, setisRefresh] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    getHospitalData();
  }, []);
  const getHospitalData = async () => {
    dispatch(setLoaderVisible(true));
    const resp = await ApiManager.get(`hospital/${hospitalId}`);
    if (resp.ok) {
      setHospital(resp.data);
      if (myInfo?.organizationType != 'other' && myInfo?.organization)
        getNotes(1);
      else dispatch(setLoaderVisible(false));
    } else {
      dispatch(setLoaderVisible(false));
      showMessage({
        message: 'Try Again',
        description: 'Error while fetching hospital record.',
        type: 'danger',
      });
      navigation.goBack();
    }
  };
  const getNotes = async pages => {
    const response = await ApiManager.get(`notes//${hospitalId}`, {
      limit: 5,
      page: pages,
      sort: 'desc',
    });
    if (response?.ok) {
      if (nextPage == null) {
        setNextPage(response.data.nextPage);
        setNotations(response.data.docs);
      } else {
        let tempData = [...notations, ...response?.data?.docs];
        setNextPage(response.data.nextPage);
        setNotations(tempData);
      }
      setisRefresh(false);
      dispatch(setLoaderVisible(false));
    } else {
      setisRefresh(false);
      dispatch(setLoaderVisible(false));
    }
  };
  const createPDF = async () => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then(async statuses => {
        if (statuses == 'granted') {
          downloadPdf();
        }
      });
    } else downloadPdf();
  };
  const downloadPdf = async () => {
    dispatch(setLoaderVisible(true));
    let body = '';
    body = body.concat('<h1 style="padding-left: 40px;">THE NTR</h1>');
    body = body.concat(
      `<h2 style="padding-left: 40px;">Notations: ${hospital?.name}</h2>`,
    );
    body = body.concat(
      '<span style="padding: 40px">Date: ' + dayjs().format() + '</span>',
    );
    const res = await ApiManager.get(`notes//${hospitalId}/all`);
    if (!res.ok) {
      errorMessage('Error downloading notes!');
      dispatch(setLoaderVisible(false));
      return;
    }
    res.data.map((item, i) => {
      body = body.concat('<h1></h1>');
      body = body.concat(
        '<table style="padding-left: 40px;padding-top: 15px"><tr><td>Name: </td>',
      );
      body = body.concat(
        '<td style="padding-left: 15px;">' +
          item.createdBy.fullName +
          '</td></tr><tr><td>Posted on: </td>',
      );
      body = body.concat(
        '<td style="padding-left: 15px;">' +
          dayjs(item.createdAt).format('DD-MM-YYYY hh:mm:a') +
          '</td></tr><tr><td>Note: </td>',
      );
      body = body.concat(
        '<td style="padding-left: 15px;">' +
          item.note +
          '</td></tr><tr><td></td>',
      );
    });
    const options = {
      html: body,
      fileName: `THENTR_${hospital?._id}`,
      directory: 'Documents',
    };
    let file = await RNHTMLtoPDF.convert(options);
    if (Platform.OS == 'ios') {
      dispatch(setLoaderVisible(false));
      setTimeout(async () => {
        await Share.share({
          url: file.filePath,
          title: 'Notes PDF',
        });
      }, 600);
    } else
      RNFS.moveFile(
        file.filePath,
        `${
          Platform.OS == 'ios'
            ? RNFS.DocumentDirectoryPath
            : RNFS.DownloadDirectoryPath
        }/THE_NTR_${hospital?._id}.pdf`,
      )
        .then(suc => {
          dispatch(setLoaderVisible(false));
          successMessage('File has been downlaoded successfully');
        })
        .catch(e => {
          dispatch(setLoaderVisible(false));
          errorMessage('Failed to download the notations. Try Again!');
        });
  };
  const deleteNotation = async () => {
    setShowDeleteModal(false);
    setTimeout(async () => {
      dispatch(setLoaderVisible(true));
      const res = await ApiManager.delete(
        `notes/${hospitalId}/${selectedNote._id}`,
      );
      if (res.ok)
        setNotations(notations.filter(item => item._id != selectedNote?._id));
      else
        errorMessage(
          'Error while deleting note',
          res?.error?.error ?? 'Something went wrong',
        );
      dispatch(setLoaderVisible(false));
    }, 600);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.notationView,
          {
            borderColor:
              item?.createdBy?._id != myInfo._id
                ? AppColors.black90
                : AppColors.white,
          },
        ]}>
        <View style={[CommonStyles.row, CommonStyles.marginBottom_1]}>
          <Avatar
            source={{
              uri: BaseUrl + 'user/profile-image/' + item?.createdBy?._id,
            }}
            editButton={false}
            size={height(4.5)}
          />
          <View style={styles.comemntInnerView}>
            <CustomText fontWeight="bold" size={4}>
              {item?.createdBy?.fullName}
            </CustomText>
            <CustomText color={AppColors.black30} size={3}>
              {dayjs(item.createdAt).format('DD-MM-YYYY hh:mm:a')}
            </CustomText>
            <CustomText color={AppColors.black} size={3}>
              {item.note}
            </CustomText>
          </View>
        </View>
        {item.createdBy?._id == myInfo._id && (
          <>
            <HorizontalLine
              customWidth={width(80)}
              color={AppColors.black10}
              containerStyles={{alignSelf: 'center'}}
            />
            <View style={styles.notationButtonView}>
              <TouchableOpacity
                style={styles.buttonOpacity}
                onPress={() => {
                  NotationInputRef.current.setNote({
                    id: item._id,
                    val: item.note,
                  });
                  setShowAddModal(true);
                }}>
                <Image source={Icons.edit1} />
                <CustomText textStyles={CommonStyles.marginLeft_2}>
                  Edit
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonOpacity}
                onPress={() => {
                  setSelectedNote(item);
                  setShowDeleteModal(true);
                }}>
                <Image source={Icons.delete} />
                <CustomText textStyles={CommonStyles.marginLeft_2}>
                  Delete
                </CustomText>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };
  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      barStyle="dark-content"
      headerUnScrollable={() => <Header onPress={() => navigation.goBack()} />}
      footerUnScrollable={() =>
        myInfo?.organizationType != 'other' && myInfo?.organization ? (
          <TouchableOpacity
            style={styles.addNotationButton}
            onPress={() => setShowAddModal(true)}>
            <CustomText color={AppColors.white}>Add Notation</CustomText>
            <Image source={Icons.send} style={styles.sendIcon} />
          </TouchableOpacity>
        ) : null
      }
      scrollEnabled
      contentContainerStyle={{paddingVertical: 0}}>
      <View style={styles.mainViewContainer}>
        {hospital != null && (
          <>
            <CustomText size={4} fontWeight="bold">
              {hospital?.name}
            </CustomText>

            <View style={styles.innerView}>
              <CustomText
                fontWeight="bold"
                textStyles={[CommonStyles.marginTop_1, {width: width(90)}]}
                size={3.4}>
                Hospital Detail
              </CustomText>
              <DetailCard
                phoneNumber={hospital?.phoneNumber}
                Beds={hospital?.acuteBeds_HCRIS}
                specialPayment={hospital?.specialPayment}
                Urban={hospital?.forhpRural_Urban2020}
              />
              <CustomText
                fontWeight="bold"
                textStyles={[CommonStyles.marginTop_2, {width: width(90)}]}
                size={3.4}>
                Hospital Location
              </CustomText>
              <LocationCard
                address={hospital?.address}
                city={hospital?.city}
                state={hospital?.state}
                zipcode={hospital.zipcode}
                latitude={hospital?.zipCoords?.coordinates[1]}
                longitude={hospital?.zipCoords?.coordinates[0]}
              />
              {myInfo?.organizationType != 'other' && myInfo?.organization && (
                <>
                  <View style={styles.notationHeader}>
                    <CustomText
                      fontWeight="bold"
                      textStyles={[CommonStyles.marginTop_2]}
                      size={3.4}>
                      Notations
                    </CustomText>
                    {notations.length > 0 && (
                      <TouchableOpacity
                        onPress={() => setShowDownloadModal(true)}>
                        <Image
                          source={Icons.download}
                          style={styles.downloadImg}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  {notations.length > 0 ? (
                    <FlatList
                      data={notations}
                      contentContainerStyle={{flex: 1}}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      onEndReached={() => {
                        if (nextPage != null) {
                          getNotes(nextPage);
                        }
                      }}
                      onEndReachedThreshold={0.5}
                      refreshing={isRefersh}
                      onRefresh={() => {
                        getNotes(1);
                      }}
                    />
                  ) : (
                    <CustomText color={AppColors.black40}>
                      No Notations found.
                    </CustomText>
                  )}
                </>
              )}
            </View>
          </>
        )}
      </View>
      <ConfirmationModal
        isVisible={showDeleteModal}
        title={'DELETE'}
        text={'Are you sure you want to delete?'}
        onClose={() => setShowDeleteModal(false)}
        onPress={deleteNotation}
      />
      <ConfirmationModal
        isVisible={showDownloadModal}
        title={'DOWNLOAD'}
        text={'Download all notations in pdf format?'}
        onClose={() => setShowDownloadModal(false)}
        onPress={() => {
          setShowDownloadModal(false);
          setTimeout(() => {
            createPDF();
          }, 600);
        }}
      />
      <NotationInputModal
        ref={NotationInputRef}
        isVisible={showAddModal}
        onClose={() => {
          NotationInputRef.current.setNote({
            id: '',
            val: '',
          });
          setShowAddModal(false);
        }}
        hospitalId={hospitalId}
        onSubmit={async note => {
          if (note.id) {
            let index = notations.findIndex(itm => itm?._id == note._id);
            let temp = [...notations];
            temp[index] = {
              ...note,
              createdBy: {
                fullName: myInfo.fullName,
                _id: myInfo._id,
                email: myInfo.email,
              },
            };
            setNotations(temp);
          } else {
            let temp = [...notations];
            temp.unshift({
              ...note,
              createdBy: {
                fullName: myInfo.fullName,
                _id: myInfo._id,
                email: myInfo.email,
              },
            });
            setNotations(temp);
          }
        }}
      />
    </ScreenWrapper>
  );
}
