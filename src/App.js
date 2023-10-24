import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './page/login/Login';
import NewsPage from './page/news/NewsPage';
import Banner from './page/banner/Banner';
import CreateNews from './page/news/CreateNews';

function App () {
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
