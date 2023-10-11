import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './page/login/Login';

function App () {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
