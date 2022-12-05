import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";

import { store } from '../../utils';
import { 
  DuplicateUserFoundException,
  DocumentNotFoundException,
  UnexpectedOutcomeException,
  UserSessionException
} from './index';


export const getAESsecret = () => {
  const userSecret = sessionStorage.getItem('PWD MAN CLIENT SECRET');

  if (userSecret) {
    return userSecret;
  } else {
    fetchAESsecretFromServer().then((data) => {
      console.log(`Returning AES secret => ${data.secret}`);
      return data.secret;
    })
  }

  throw new UnexpectedOutcomeException('Code execution reached place in code that should not have been possible.');
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

const fetchAESsecretFromServer = async () => {
  const uid = sessionStorage.getItem('User ID');

  if (!uid) {
    const errMsg = 'User ID not found in session storage';
    throw new UserSessionException(errMsg);
  }

  const taskDocRef = doc(store, 'users', `${uid}`);
  const docSnap = await getDoc(taskDocRef);

  if (!docSnap.exists()) {
    const errMsg = `User record for user [${uid}] not found in store`;
    throw new DocumentNotFoundException(errMsg);
  }

  return docSnap.data();
}
