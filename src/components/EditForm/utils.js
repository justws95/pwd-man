import { doc, updateDoc } from "firebase/firestore";
import AES from 'crypto-js/aes';

import { store } from '../../utils';
import { 
  getAESsecret,
  UserSessionException, 
  UserSecretNotFoundException 
} from '../common/';

export const updatePasswordRecord = async (documentID, data, cb, errCb) => {
  const db = store;

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

  // Encrypt the password client-side using AES-256 and the stored secret
  let encryptedPwd = AES.encrypt(data['password'], userSecret);
  data['password'] = String(encryptedPwd);

  const docRef = doc(db, 'records', `${uid}`, 'current', `${documentID}`);

  updateDoc(docRef, data).then((data) => {
    console.log(`Record [${documentID}] has been updated!`);
    cb(true);
  }).catch((error) => {
    console.error(`Error occurred while updating record: ${error}`);
    errCb(true);
  })
}
