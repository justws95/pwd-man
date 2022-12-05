import { getAuth, signOut } from "firebase/auth";

import { setUserLoginState } from './../common';

export const logUserOut = async (callback) => {
    const auth = getAuth();

    signOut(auth).then(async () => {
        // Remove user session info and navigate to login page
        sessionStorage.removeItem('Auth Token');
        
        // Update the user's login state in firestore
        const uid = sessionStorage.getItem('User ID');
        await setUserLoginState(uid, false);

        sessionStorage.removeItem('User ID');

        callback('/login');
      }).catch((error) => {
        console.error(`Unable to log user out: ${error}`);
      });
}