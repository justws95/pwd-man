import React from 'react';
import AddForm from './AddForm';
import StoredPasswordsTable from './StoredPasswordsTable';

import { store } from '../utils';
import {collection, addDoc, Timestamp} from 'firebase/firestore';





const App = (props) => {
  return (
    <React.Fragment>
      <AddForm />
    </React.Fragment>
  );
}

export default App;