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
// Celublog
import CelubPage from './pages/celublog/CelubPage';
import CelubWithdraw from './pages/celublog/CelubWithdraw';
import CelubComplete from './pages/celublog/CelubComplete';
import CelubAccountList from './pages/celublog/CelubAccountList';
import CelubDetail from './pages/celublog/CelubDetail';
import CelubRule from './pages/celublog/CelubRule';
import CelubDeposit from './pages/celublog/CelubDeposit';
import Pattern from './components/pattern/PatternPage';

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
          <Route
            path='/celub/*'
            element={
              <AccountContextProvider>
                <Routes>
                  <Route path="" element={<CelubPage/>}/>
                  <Route path="withdraw" element={<CelubWithdraw/>}/>
                  <Route path="withdraw/complete" element={<CelubComplete/>}/>
                  <Route path="list" element={<CelubAccountList/>}/>
                  <Route path="detail" element={<CelubDetail/>}/>
                  <Route path="rule" element={<CelubRule/>}/>
                  <Route path="deposit" element={<CelubDeposit/>}/>
                </Routes>
              </AccountContextProvider>
            }
          />
          <Route path="/pattern" element={<Pattern nextUrl="celub-withdraw/complete"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
