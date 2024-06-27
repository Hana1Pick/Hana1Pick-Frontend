import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
// 계좌 이체
import { AccountContextProvider } from './contexts/AccountContextProvider';
import SelectAccountPage from './pages/account/SelectAccountPage';
import SearchAccountPage from './pages/account/SearchAccoutPage';
import GetAmountPage from './pages/account/GetAmountPage';
import CashOutPage from './pages/account/CashOutPage';
import CashOutPatternPage from './pages/account/CashOutPatternPage';
import CashOutResultPage from './pages/account/CashOutResultPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route
            path='/cash-out/*'
            element={
              <AccountContextProvider>
                <Routes>
                  <Route path='account' element={<SelectAccountPage />} />
                  <Route path='account-query' element={<SearchAccountPage />} />
                  <Route path='amount' element={<GetAmountPage />} />
                  <Route path='' element={<CashOutPage />} />
                  <Route path='pattern' element={<CashOutPatternPage />} />
                  <Route path='result' element={<CashOutResultPage />} />
                </Routes>
              </AccountContextProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
