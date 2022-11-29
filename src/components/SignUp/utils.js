import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const signUpUser = (email, password) => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.info(`Account for user [${user}] has been created!`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error occurred while registering new user. Error code ${errorCode} : ${errorMessage}`);
    });
}
