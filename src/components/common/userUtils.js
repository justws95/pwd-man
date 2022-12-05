import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";

import { store } from '../../utils';
import { DuplicateUserFoundException } from './commonExceptions';

export const getAESsecret = () => {
  const userSecret = sessionStorage.getItem('PWD MAN CLIENT SECRET');
  return userSecret;
}

export const setAESsecret = (newSecret) => {
  sessionStorage.setItem('PWD MAN CLIENT SECRET', newSecret);
}

export const setUserLoginState = async (uid, state) => {
  // Find the user in the users collection
  const usersRef = collection(store, 'users')
  const userQuery = query(usersRef, where("uID", "==", uid));

  const querySnapshot = await getDocs(userQuery);

  let recordFound = false;
  let recordID = null;

  querySnapshot.forEach((doc) => {
    if (!recordFound) {
      recordFound = true;
      recordID = doc.id;
    } else {
      const errMsg = `Multiple results returned during user lookup for user ID ${uid}`;
      throw new DuplicateUserFoundException(errMsg);
    }
  });

  // Update their login state if found
  const docRef = doc(store, 'users', recordID);

  let userUpdate = {
    'isLoggedIn': state
  }

  if (state) {
    userUpdate['lastLogin'] = serverTimestamp();
  } else {
    userUpdate['lastLogout'] = serverTimestamp();
  }

  await updateDoc(docRef, userUpdate);
}
