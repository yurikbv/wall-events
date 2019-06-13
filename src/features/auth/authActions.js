import { SubmissionError } from "redux-form";
import { closeModal } from "../modals/modalActions";
import md5 from 'md5';
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
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await fireStoreDB.collection('users').doc(createdUser.user.uid).set(newUser);
      dispatch(closeModal());
    }catch (e) {
      console.log(e);
    }
  }
;
