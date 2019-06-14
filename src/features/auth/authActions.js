import { SubmissionError, reset } from "redux-form";
import { closeModal } from "../modals/modalActions";
import md5 from 'md5';
import { toastr } from "react-redux-toastr";
import {firebase, fireStoreDB} from '../../app/config/firebase';

export const login = (creds) => {
  return async (dispatch) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    }catch (e) {
      console.log(e);
      throw new SubmissionError({
        _error: "Login failed"
      })
    }
  }
};

export const registerUser = (user) =>
  async (dispatch) => {
    try {
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      await createdUser.user.updateProfile({
        displayName: user.displayName,
        photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
        });
      console.log(createdUser);
      let newUser = {
        displayName: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
        // avatarUrl: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
      };
      await fireStoreDB.collection('users').doc(createdUser.user.uid).set(newUser);
      dispatch(closeModal());
    }catch (e) {
      console.log(e);
      throw new SubmissionError({
        _error: e.message
      })
    }
  }
;

export const socialLogin = (selecterProvider) => {
  return async (dispatch) => {
    try {
      dispatch(closeModal());
      let user = await firebase.login({
        provider: selecterProvider,
        type: "popup"
      });
      if(user.additionalUserInfo.isNewUser) {
        fireStoreDB.collection('users').doc(user.user.uid).set({
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export const updatePassword = (creds) =>
    async dispatch => {
      const user = firebase.auth().currentUser;
      try {
        await user.updatePassword(creds.newPassword1);
        await dispatch(reset('account'));
        toastr.success('Success','Your password has been updated')
      } catch (e) {
        console.log(e);
        throw new SubmissionError({
          _error: e.message
        })
      }
    };
