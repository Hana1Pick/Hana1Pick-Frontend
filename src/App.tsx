import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
// 계좌 이체
import SelectAccountPage from './pages/account/SelectAccountPage';
import SearchAccountPage from './pages/account/SearchAccoutPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/cash-out/account' element={<SelectAccountPage />} />
          <Route
            path='/cash-out/account-query'
            element={<SearchAccountPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
