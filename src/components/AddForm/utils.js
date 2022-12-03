import { store } from '../../utils';
import { collection, addDoc } from 'firebase/firestore';

export const addNewPassword = async (data, successCallback) => {
  const db = store;

  try {
    const uid = sessionStorage.getItem('User ID');
    
    if (!uid) {
      /*
      const errMsg = 'User ID not found in session';
      throw UserSessionException(errMsg);*/
      throw 'User ID not found in session';
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

export const UserSessionException = (message) => {
  this.message = message;
  this.name = 'UserSessionException';
}
