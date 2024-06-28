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
// QR 계좌 이체
import { QrContextProvider } from './contexts/QrContextProvider';
import SelectQrInAccountPage from './pages/qr/SelectQrInAccountPage';
import GetQrAmountPage from './pages/qr/GetQrAmountPage';
import CreateQrResultPage from './pages/qr/CreateQrResultPage';
import GetQrPage from './pages/qr/GetQrPage';
import AnalyzeQrPage from './pages/qr/AnalyzeQrPage';
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
          {/* 계좌 이체 */}
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
                  {/* QR */}
                  <Route path='qr' element={<GetQrPage />} />
                  <Route path='qr/result' element={<AnalyzeQrPage />} />
                </Routes>
              </AccountContextProvider>
            }
          />
          {/* QR 계좌 이체 */}
          <Route
            path='qr/cash-in/*'
            element={
              <QrContextProvider>
                <Routes>
                  <Route path='account' element={<SelectQrInAccountPage />} />
                  <Route path='amount' element={<GetQrAmountPage />} />
                  <Route path='result' element={<CreateQrResultPage />} />
                </Routes>
              </QrContextProvider>
            }
          />
          {/* Celublog */}
          <Route path='/celub' element={<CelubPage />} />
          <Route path='/celub-withdraw' element={<CelubWithdraw />} />
          <Route path='/celub-withdraw/complete' element={<CelubComplete />} />
          <Route path='/celub/list' element={<CelubAccountList />} />
          <Route path='/celub/detail' element={<CelubDetail />} />
          <Route path='/celub/rule' element={<CelubRule />} />
          <Route path='/celub/deposit' element={<CelubDeposit />} />
          <Route path='/pattern/:nextUrl' element={<Pattern />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
