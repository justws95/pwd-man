import { store } from '../../utils';
import { collection, addDoc } from 'firebase/firestore';

export const addNewPassword = async (data, successCallback) => {
  const db = store;

  try {
    const docRef = await addDoc(collection(db, 'records'), data);
    console.debug("Document written with ID: ", docRef.id);
    successCallback(true);
  } catch (e) {
    console.error("Error adding document: ", e);
    successCallback(false);
  }
}
