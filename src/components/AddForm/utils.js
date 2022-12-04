import { collection, addDoc } from 'firebase/firestore';

import { store } from '../../utils';
import UserSessionException from '../common';

export const addNewPassword = async (data, successCallback) => {
  const db = store;

  try {
    const uid = sessionStorage.getItem('User ID');
    
    if (!uid) {
      const errMsg = 'User ID not found in session storage';
      throw new UserSessionException(errMsg);
    } else {
      data['ownerID'] = uid;
    }

    const docRef = await addDoc(collection(db, 'records', `${uid}`, 'current'), data);
    console.debug("Document written with ID: ", docRef.id);
    successCallback(true);
  } catch (e) {
    console.error("Error adding document: ", e);
    successCallback(false);
  }
}
