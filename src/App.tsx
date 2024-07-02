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
import CelubComplete from './pages/celublog/CelubComplete';
import CelubAccountList from './pages/celublog/CelubAccountList';
import CelubDetail from './pages/celublog/CelubDetail';
import CelubRule from './pages/celublog/CelubRule';
import CelubSelect from './pages/celublog/CelubSearch';
import CelubAcc from './pages/celublog/CelubAcc';
import CelubName from './pages/celublog/CelubName';
import CelubPattern from './pages/celublog/CelubPattern';

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
// MoaClub
import { MoaclubContextProvider } from './contexts/MoaclubContextProvider';
import MoaclubInvite from './pages/moaclub/MoaclubInvite';
import MoaclubJoin from './pages/moaclub/MoaclubJoin';
import MoaclubPage from './pages/moaclub/MoaclubPage';
import MoaclubFeeStatus from './pages/moaclub/MoaclubFeeStatus';
import MoaclubSetting from './pages/moaclub/MoaclubSetting';
import MoaclubModify from './pages/moaclub/MoaclubModify';
import MoaclubDeposit from './pages/moaclub/MoaclubDeposit';
import { MoaclubTrsfContextProvider } from './contexts/MoaclubTrsfContextProvider';
import MoaclubPw from './pages/moaclub/MoaclubPw';
import MoaclubTrsfResult from './pages/moaclub/MoaclubTrsfResult';
import MoaclubVoteSelect from './pages/moaclub/MoaclubVoteSelect';
import MoaclubVoteManager from './pages/moaclub/MoaclubVoteManager';
import MoaclubVoteTrsf from './pages/moaclub/MoaclubVoteTrsf';
import MoaclubWithdraw from './pages/moaclub/MoaclubWithdraw';
import MoaclubAutoTrsf from './pages/moaclub/MoaclubAutoTrsf';
import MoaclubAutoTrsfDetail from './pages/moaclub/MoaclubAutoTrsfDetail';
import MoaclubAutoTrsfRegister from './pages/moaclub/MoaclubAutoTrsfRegister';
import MoaclubAutoTrsfPw from './pages/moaclub/MoaclubAutoTrsfPw';
import MoaclubAutoTrsfComplete from './pages/moaclub/MoaclubAutoTrsfComplete';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
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
									<Route path='withdraw' element={<CelubAcc />} />
									<Route path='complete' element={<CelubComplete />} />
									<Route path='list' element={<CelubAccountList />} />
									<Route path='detail' element={<CelubDetail />} />
									<Route path='rule' element={<CelubRule />} />
									<Route path='search' element={<CelubSelect />} />
									<Route path='name' element={<CelubName />} />
									<Route path='pattern' element={<CelubPattern />} />
									{/* <Route path="acc" element={<CelubAcc/>}/> */}
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
									<Route path='/invite' element={<MoaclubInvite />} />
								</Routes>
							</MoaclubContextProvider>
						}
					/>
					<Route path='/moaclub/join/:accountId' element={<MoaclubJoin />} />
					<Route path='/moaclub/main/:accountId' element={<MoaclubPage />} />
					<Route
						path='/moaclub/fee/:accountId'
						element={<MoaclubFeeStatus />}
					/>
					<Route
						path='/moaclub/setting/:accountId'
						element={<MoaclubSetting />}
					/>
					<Route
						path='/moaclub/modify/:accountId'
						element={<MoaclubModify />}
					/>
					<Route
						path='/moaclub/vote/:accountId'
						element={<MoaclubVoteSelect />}
					/>
					<Route
						path='/moaclub/vote/manager/:accountId'
						element={<MoaclubVoteManager />}
					/>
					<Route
						path='/moaclub/vote/trsf/:accountId'
						element={<MoaclubVoteTrsf />}
					/>
					<Route
						path='/moaclub/withdraw/:accountId'
						element={<MoaclubWithdraw />}
					/>
					<Route
						path='/moaclub/autotrsf/:accountId'
						element={<MoaclubAutoTrsf />}
					/>
					<Route
						path='/moaclub/autotrsf/detail/:accountId'
						element={<MoaclubAutoTrsfDetail />}
					/>
					<Route
						path='/moaclub/autotrsf/register/:accountId'
						element={<MoaclubAutoTrsfRegister />}
					/>
					<Route path='/moaclub/autotrsf/pw' element={<MoaclubAutoTrsfPw />} />
					<Route
						path='/moaclub/autotrsf/complete'
						element={<MoaclubAutoTrsfComplete />}
					/>

					<Route
						path='/moaclub/deposit/*'
						element={
							<MoaclubTrsfContextProvider>
								<Routes>
									<Route path='/:accountId' element={<MoaclubDeposit />} />
									<Route path='/pw' element={<MoaclubPw />} />
									<Route path='/trsf/result' element={<MoaclubTrsfResult />} />
								</Routes>
							</MoaclubTrsfContextProvider>
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
