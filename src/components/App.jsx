import React from 'react';
import AddForm from './AddForm';
import StoredPasswordsTable from './StoredPasswordsTable';

import {collection, addDoc, Timestamp} from 'firebase/firestore';


const App = ({ app, store }) => {
  return (
    <React.Fragment>
      <AddForm />
    </React.Fragment>
  );
}

export default App;