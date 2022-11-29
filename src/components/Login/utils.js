import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const logUserIn = (email, password) => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.info(`User [${user}] has been logged in.`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`Error occurred while logging user in. Error code ${errorCode} : ${errorMessage}`);
    });
}