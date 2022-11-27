import { store } from '../../utils';
import { collection, getDocs } from 'firebase/firestore/lite';

export const getStoredRecords = async () => {
  const db = store;

  const recordsCol = collection(db, 'records');
  const recordsSnapshot = await getDocs(recordsCol);
  const recordsList = recordsSnapshot.docs.map(doc => doc.data());

  return recordsList;
}
