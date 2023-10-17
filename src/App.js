import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Redirect, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Login from './page/login/Login';
import NewsPage from './page/news/NewsPage';
import Banner from './page/banner/Banner';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//       sessionStorage.getItem('accessToken') ? <Component {...props} /> : <Navigate to="/"/>
//     )} />
// );

function App () {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/news" element = { <NewsPage /> }/>
        <Route path="/banner" element = {<Banner/> } />
      </Routes>
    </Router>
  );
}

export default App;
