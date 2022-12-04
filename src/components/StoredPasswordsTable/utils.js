import { 
  collection, 
  deleteDoc,
  doc,
  getDocs
} from 'firebase/firestore';

import { store } from '../../utils';
import UserSessionException from '../common';

export const getStoredRecords = async () => {
  const db = store;
  const records = [];

  const uid = sessionStorage.getItem('User ID');
    
  if (!uid) {
    const errMsg = 'User ID not found in session storage';
    throw new UserSessionException(errMsg);
  }
 
  const userCollection = collection(db, 'records', `${uid}`, 'current');
  const querySnapshot = await getDocs(userCollection);
  
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    data['id'] = doc.id;
    records.push(data); 
  });

  return records;
}

export const deleteRecordEntry = async (id) => {
  const db = store;
  const taskDocRef = doc(db, 'records', id);
  
  await deleteDoc(taskDocRef);
}
