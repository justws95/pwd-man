import React, { useEffect } from 'react';

import { useQuery } from '../common';


const EditForm = () => {
  let query = useQuery();

  useEffect(() => {
    const documentID = query.get('documentID');
    console.log(`In edit page, the document ID is => ${documentID}`);
  }, [query]);

  return (
    <React.Fragment>
      <h1>This is the EditForm Component</h1>
    </React.Fragment>
  );
}

export default EditForm;
