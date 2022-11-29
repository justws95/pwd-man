import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AddForm from './AddForm';
import HeaderBar from './HeaderBar';
import Login from './Login';
import SignUp from './SignUp';
import StoredPasswordsTable from './StoredPasswordsTable';


const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="home" element={<StoredPasswordsTable />} />
            <Route path="add" element={<AddForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;