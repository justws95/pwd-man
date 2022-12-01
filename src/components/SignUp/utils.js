import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const signUpUser = (email, password, callback, errorCallback) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.info(`Account for user [${response.user.email}] has been created!`);

      // Store user info in session
      sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);

      callback('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error occurred while registering new user. Error code ${errorCode} : ${errorMessage}`);
      errorCallback(errorMessage);
    });
}
