import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const signUpUser = (email, password, callback, errorCallback) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.info(`Account for user [${user.email}] has been created!`);
      callback('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error occurred while registering new user. Error code ${errorCode} : ${errorMessage}`);
      errorCallback(errorMessage);
    });
}
