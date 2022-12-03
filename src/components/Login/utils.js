import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const logUserIn = async (email, password, callback, errorCallback) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.debug(`User has been signed in ${response.user.email}`);

      // Store user info in session
      sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
      sessionStorage.setItem('User ID', response.user.uid);

      callback('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error occurred while logging user in. Error code ${errorCode} : ${errorMessage}`);
      errorCallback(errorMessage);
    });
}