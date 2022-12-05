import {
  addDoc,
  collection, 
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';

import { store } from '../../utils';
import {
  DocumentNotFoundException
} from '../common/';

export const deleteRecordEntry = async (id) => {
  const db = store;
  const uid =  sessionStorage.getItem('User ID');
  const taskDocRef = doc(db, 'records', `${uid}`, 'current', id);

  // Copy the document and move to deleted entry before deleting from current passwords
  const docSnap = await getDoc(taskDocRef);

  if (!docSnap.exists()) {
    const errMsg = `Document [${id}] not found in store`;
    throw new DocumentNotFoundException(errMsg);
  }

  let deletedData = docSnap.data();
  deletedData['deleteTime'] = serverTimestamp();

  await addDoc(collection(db, 'records', `${uid}`, 'deleted'), deletedData);
  await deleteDoc(taskDocRef);
}
 