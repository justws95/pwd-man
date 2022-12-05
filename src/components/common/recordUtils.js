import {
  collection,
  getDocs
} from 'firebase/firestore';
import * as CryptoJS from 'crypto-js';

import { store } from '../../utils';
import { 
  getAESsecret,
  UserSessionException, 
  UserSecretNotFoundException,
} from './index';

export const getStoredRecords = async () => {
  const db = store;
  const records = [];

  const uid = sessionStorage.getItem('User ID');
    
  if (!uid) {
    const errMsg = 'User ID not found in session storage';
    throw new UserSessionException(errMsg);
  }

  const userSecret = getAESsecret();

  if (!userSecret) {
    const errMsg = 'User Client Side Secret not found in local storage';
    throw new UserSecretNotFoundException(errMsg);
  }

  const userCollection = collection(db, 'records', `${uid}`, 'current');
  const querySnapshot = await getDocs(userCollection);
  
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    data['id'] = doc.id;

    // Decrypt the passwords
    let decryptedPwd = CryptoJS.AES.decrypt(data['password'], userSecret).toString(CryptoJS.enc.Utf8);
    data['password'] = String(decryptedPwd);

    records.push(data); 
  });

  return records;
}
