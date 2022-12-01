import { getAuth, signOut } from "firebase/auth";


export const logUserOut = async (callback) => {
    const auth = getAuth();

    signOut(auth).then(() => {
        // Remove user session info and navigate to login page
        sessionStorage.removeItem('Auth Token');

        callback('/login');
      }).catch((error) => {
        console.error(`Unable to log user out: ${error}`);
      });
}