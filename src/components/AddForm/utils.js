import { store } from '../../utils';
import { collection, addDoc } from "firebase/firestore";

export const addNewPassword = async (data) => {
  const db = store;
  let success = null;

  try {
    const docRef = await addDoc(collection(db, "records"), data);
    console.debug("Document written with ID: ", docRef.id);
    success = true;
  } catch (e) {
    console.error("Error adding document: ", e);
    success = false;
  }

  return success;
}
