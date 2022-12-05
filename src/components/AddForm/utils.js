import { collection, addDoc } from 'firebase/firestore';
import AES from 'crypto-js/aes';

import { store } from '../../utils';
import { 
  getAESsecret,
  UserSessionException, 
  UserSecretNotFoundException 
} from '../common/';

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

    const userSecret = getAESsecret();

    if (!userSecret) {
      const errMsg = 'User Client Side Secret not found in local storage';
      throw new UserSecretNotFoundException(errMsg);
    }

    // Encrypt the password client-side using AES-256 and the stored secret
    let encryptedPwd = AES.encrypt(data['password'], userSecret);
    data['password'] = String(encryptedPwd);

    const docRef = await addDoc(collection(db, 'records', `${uid}`, 'current'), data);
    console.debug("Document written with ID: ", docRef.id);
    successCallback(true);
  } catch (e) {
    console.error("Error adding document: ", e);
    successCallback(false);
  }
}
