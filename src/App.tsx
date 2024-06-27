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
import MoaclubOpening from './pages/moaclub/MoaclubOpening';

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
          <Route path='/moaclub/opening' element={<MoaclubOpening />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
