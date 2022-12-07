import {
  collection,
  doc,
  getDoc,
  getDocs
} from 'firebase/firestore';
import * as CryptoJS from 'crypto-js';

import { store } from '../../utils';
import { 
  getAESsecret,
  DocumentNotFoundException,
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


export const getStoredRecord = async (recordID) => {
  const db = store;
  let record = {};

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

  const docRef = doc(db, 'records', `${uid}`, 'current', `${recordID}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    record = docSnap.data();
    
    let decryptedPwd = CryptoJS.AES.decrypt(record['password'], userSecret).toString(CryptoJS.enc.Utf8);
    record['password'] = String(decryptedPwd);
  } else {
    const errMsg = `Document ID [${recordID}] was not found`;
    throw new DocumentNotFoundException(errMsg);
  }

  return record;
}
