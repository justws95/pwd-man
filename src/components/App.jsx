import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AddForm from './AddForm';
import HeaderBar from './HeaderBar';
import EditForm from './EditForm';
import Login from './Login';
import PageNotFound from './PageNotFound';
import SignUp from './SignUp';
import StoredPasswordsTable from './StoredPasswordsTable';


const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route path="/">
            <Route index element={<StoredPasswordsTable />} />
            <Route path="add" element={<AddForm />} />
            <Route path="edit" element={<EditForm />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;