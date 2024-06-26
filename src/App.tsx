import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CelubPage from './pages/celublog/CelubPage';
import CelubWithdraw from './pages/celublog/CelubWithdraw';
import CelubComplete from './pages/celublog/CelubComplete';
import CelubAccountList from './pages/celublog/CelubAccountList';
import CelubDetail from './pages/celublog/CelubDetail';
import CelubRule from './pages/celublog/CelubRule';
import CelubDeposit from './pages/celublog/CelubDeposit';
import Pattern from './components/pattern/PatternPage';
import DepositCreation1 from "./pages/deposit/DepositCreation1";
import DepositCreation2 from "./pages/deposit/DepositCreation2";
import PatternPassword from "./pages/deposit/PatternPassword";
import UserAgree from "./pages/deposit/UserAgree";
import DepositComplete from "./pages/deposit/DepositComplete";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/celub" element={<CelubPage/>}/>
          <Route path="/celub-withdraw" element={<CelubWithdraw/>}/>
          <Route path="/celub-withdraw/complete" element={<CelubComplete/>}/>
          <Route path="/celub/list" element={<CelubAccountList/>}/>
          <Route path="/celub/detail" element={<CelubDetail/>}/>
          <Route path="/celub/rule" element={<CelubRule/>}/>
          <Route path="/celub/deposit" element={<CelubDeposit/>}/>
          <Route path="/pattern/:nextUrl" element={<Pattern />}/>
          <Route path="deposit" element={<DepositCreation1 />} />
          <Route path="/deposit2" element={<DepositCreation2 />} />
          <Route path="/deposit3" element={<PatternPassword />} />
          <Route path="/deposit4" element={<UserAgree />} />
          <Route path="/deposit5" element={<DepositComplete />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
