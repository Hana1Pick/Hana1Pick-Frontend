import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

// Deposit
import DepositCreation1 from './pages/deposit/DepositCreation1';
import DepositCreation2 from './pages/deposit/DepositCreation2';
import PatternPassword from './pages/deposit/PatternPassword';
import UserAgree from './pages/deposit/UserAgree';
import DepositComplete from './pages/deposit/DepositComplete';
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
import SelectQrOutAccountPage from './pages/qr/SelectQrOutAccountPage';
import GetQrAmountPage from './pages/qr/GetQrAmountPage';
import CreateQrResultPage from './pages/qr/CreateQrResultPage';
import GetQrPage from './pages/qr/GetQrPage';
// Celublog
import CelubPage from './pages/celublog/CelubPage';
import CelubWithdraw from './pages/celublog/CelubWithdraw';
import CelubComplete from './pages/celublog/CelubComplete';
import CelubAccountList from './pages/celublog/CelubAccountList';
import CelubDetail from './pages/celublog/CelubDetail';
import CelubRule from './pages/celublog/CelubRule';
import CelubDeposit from './pages/celublog/CelubDeposit';
// Moaclub
import Pattern from './components/pattern/PatternPage';
import MoaclubOpening from './pages/moaclub/MoaclubOpening';
import MoaclubSelectAcc from './pages/moaclub/MoaclubSelectAcc';
import MoaclubCreatePage from './pages/moaclub/MoaclubCreatePage';
import MoaclubComplete from './pages/moaclub/MoaclubComplete';
import MoaclubPattern from './pages/moaclub/MoaclubPattern';
// User
import KakaoLoginPage from './pages/user/login/KakaoLoginPage';
import LoginHandeler from './pages/user/login/LoginHandeler';
import { MoaclubContextProvider } from './contexts/MoaclubContextProvider';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/pattern'
            element={<Pattern nextUrl='celub-withdraw/complete' />}
          />
          <Route path='deposit' element={<DepositCreation1 />} />
          <Route path='/deposit2' element={<DepositCreation2 />} />
          <Route
            path='/deposit3'
            element={<PatternPassword nextUrl='deposit4' />}
          />
          <Route path='/deposit4' element={<UserAgree />} />
          <Route path='/deposit5' element={<DepositComplete />} />
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
                  <Route
                    path='/qr/*'
                    element={
                      <Routes>
                        <Route path='' element={<GetQrPage />} />
                        <Route
                          path='account'
                          element={<SelectQrOutAccountPage />}
                        />
                      </Routes>
                    }
                  />
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
          <Route
            path='/celub/*'
            element={
              <AccountContextProvider>
                <Routes>
                  <Route path='' element={<CelubPage />} />
                  <Route path='withdraw' element={<CelubWithdraw />} />
                  <Route path='withdraw/complete' element={<CelubComplete />} />
                  <Route path='list' element={<CelubAccountList />} />
                  <Route path='detail' element={<CelubDetail />} />
                  <Route path='rule' element={<CelubRule />} />
                  <Route path='deposit' element={<CelubDeposit />} />
                </Routes>
              </AccountContextProvider>
            }
          />
          {/* Moaclub */}
          <Route
            path='/moaclub/*'
            element={
              <MoaclubContextProvider>
                <Routes>
                  <Route path='/opening' element={<MoaclubOpening />} />
                  <Route path='/select-acc' element={<MoaclubSelectAcc />} />
                  <Route path='/create' element={<MoaclubCreatePage />} />
                  <Route path='/complete' element={<MoaclubComplete />} />
                  <Route path='/pattern' element={<MoaclubPattern />} />
                </Routes>
              </MoaclubContextProvider>
            }
          />
          {/* User */}
          <Route
            path='/user/*'
            element={
              <AccountContextProvider>
                <Routes>
                  <Route path='login' element={<KakaoLoginPage />} />
                </Routes>
              </AccountContextProvider>
            }
          />
          <Route
            path='/api/user/oauth/kakao' //redirect_url
            element={<LoginHandeler />} //당신이 redirect_url에 맞춰 꾸밀 컴포넌트
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
