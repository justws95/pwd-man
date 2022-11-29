import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const logUserIn = async (email, password, callback) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.debug(`User has been signed in ${user.email}`);
      callback('/home');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error occurred while logging user in. Error code ${errorCode} : ${errorMessage}`);
    });
}