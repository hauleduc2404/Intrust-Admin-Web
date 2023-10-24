import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './page/login/Login';
import NewsPage from './page/news/NewsPage';
import Banner from './page/banner/Banner';
import CreateNews from './page/news/CreateNews';
import { useState } from 'react';
import { useEffect } from 'react';
const PrivateRoute = ({ component: Component, isAuthenticated, requiredLogin, ...rest }) => {
  if (!isAuthenticated) {
    if (requiredLogin) {
      return <Navigate to="/" />;
    }
  }

  return <Component {...rest} />;
};
function App () {
  const [accessTokenExpiration, setAccessTokenExpiration] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const expirationTimestamp = localStorage.getItem('accessExpiredToken');
    
    if (accessToken && expirationTimestamp) {
      const expirationDate = new Date(parseInt(expirationTimestamp)); // Chuyển đổi từ Unix timestamp (giây) sang mili giây
      setAccessTokenExpiration(expirationDate);

      // Bắt đầu hẹn giờ kiểm tra tự động đăng xuất
      startLogoutTimer(expirationDate);
    }
  }, []);

  const startLogoutTimer = (expirationTime) => {
    const currentTime = new Date();
    if (currentTime >= expirationTime) {
      window.location.reload();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshExpiredTime');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessExpiredToken');
      localStorage.removeItem('time');
    } else {
      const timeUntilLogout = expirationTime - currentTime;
      setTimeout(() => {
        startLogoutTimer(expirationTime);
      }, timeUntilLogout);
    }
  };
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/news" element = { <NewsPage /> }/>
        <Route path="/banner" element = {<Banner/> } />
        <Route path="/createNews" element = {<CreateNews/> } />
      </Routes>
    </Router>
  );
}

export default App;
