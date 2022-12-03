import { store } from '../../utils';
import { 
  collection, 
  deleteDoc,
  doc,
  getDocs
} from 'firebase/firestore';

export const getStoredRecords = async () => {
  const db = store;
  const records = [];

  const querySnapshot = await getDocs(collection(db, 'records'));
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
