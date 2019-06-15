import {fireStoreDB} from '../../app/config/firebase'
import moment from 'moment';
import { toastr } from "react-redux-toastr";

export const updateProfile = (dataUser) =>
  async (dispatch, getState) => {
    const {isLoaded, isEmpty, ...updatedUser} = dataUser;
    if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
    }
    const userId = getState().firebase.auth.uid;
    try {
      await fireStoreDB.collection('users').doc(userId).set(dataUser);
      toastr.success('Success', 'Profile updated')
    } catch (e) {
      console.log(e);
    }
  }
;