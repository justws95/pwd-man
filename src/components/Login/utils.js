import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { setUserLoginState } from './../common';

export const logUserIn = async (email, password, callback, errorCallback) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(async (response) => {
      console.debug(`User has been signed in ${response.user.email}`);

      // Store user info in session
      sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
      sessionStorage.setItem('User ID', response.user.uid);

      // Update the user's login state in firestore
      await setUserLoginState(response.user.uid, true);

      callback('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error occurred while logging user in. Error code ${errorCode} : ${errorMessage}`);
      errorCallback(errorMessage);
    });
}
