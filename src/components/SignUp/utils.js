import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import *  as randomstring from 'randomstring';

import { store } from '../../utils';


export const signUpUser = (email, password, callback, errorCallback) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (response) => {
      console.info(`Account for user [${response.user.email}] has been created!`);

      // Generate the client side secret used for AES
      const secret = randomstring.generate({
        length: 42,
        charset: 'alphanumeric'
      });

      localStorage.setItem('PWD MAN CLIENT SECRET', secret)

      // Add user info to user table
      const db = store;
      const userData = {
        'uID': response.user.uid,
        'displayName': response.user.displayName,
        'email': response.user.email,
        'photoURL': response.user.photoURL,
        'phoneNumber': response.user.phoneNumber,
        'emailVerified': response.user.emailVerified,
        'provider': response.user.providerId
      }

      await addDoc(collection(db, 'users'), userData);

      // Store user info in session
      sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
      sessionStorage.setItem('User ID', response.user.uid);

      callback('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error occurred while registering new user. Error code ${errorCode} : ${errorMessage}`);
      errorCallback(errorMessage);
    });
}
