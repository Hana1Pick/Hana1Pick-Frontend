import CelubHeader from '../../layouts/CelubHeader';
import '../moaclub/MoaclubStyle.scss';
import '../../common/styles/scss/CommonStyle.scss';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import qs from 'qs';
import settingImg from '../../assets/images/celub/settingImg.png';
import arrow from '../../assets/images/common/righticon.png'
import {CelubAccountInfo, CelubRuleType } from '../../type/commonType';
import CommonBtn from '../../components/button/CommonBtn';
import CommonModal1 from '../../components/button/CommonModal1';

function CelubSetting() {
	const navigate = useNavigate();
	const location = useLocation();
	const accountId = location.state;
	const [fileInput, setFileInput] = useState<File | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [look, setLook] = useState(false);
	const [celubAccount, setCelubAccount] = useState<CelubAccountInfo>({
        accountId: "",
        balance: 0,
        name: "",
        imgSrc: "",
        outAccId: "",
        celebrityIdx: 0,
        duration: 0,
        createDate: ""
    });
	const [rules, setRules] = useState<CelubRuleType[]>([]);
	interface Rule {
		ruleIdx: number;
		ruleName: string;
		ruleMoney: number;
	}
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
            qs.stringify({accountId:accountId}))
            .then((res)=>{
                console.log(res.data.data);
				setCelubAccount(res.data.data.accountInfo);
				setRules(
					res.data.data.ruleInfo.map((rule:Rule) => ({
						ruleName: rule.ruleName,
						ruleMoney: rule.ruleMoney
					}))
				)
				console.log("됐냐?");
				console.log(rules);
            }).catch((error)=>{
                console.log("실패");
            });
    }, [look]); 
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
	const clearInput = () => {
        setInputValue('');
    };
	const goCelubName = () => {
		const div1 = document.getElementById('withdraw-box4');
		const div2 = document.getElementById('celub-withdraw-overlay');
		if(div1){
			div1.style.display = 'block';
		}
		if(div2){
			div2.style.display = 'block';
		}
	};
	const closeModal = () => {
		const div1 = document.getElementById('myModal');
		const div2 = document.getElementById('celub-withdraw-overlay');
		if(div1){
			div1.style.display = 'none';
		}
		if(div2){
			div2.style.display = 'none';
		}
	}
	const gochangeName = () => {
		const formData = new FormData();
        formData.append('accountId', accountId);
        formData.append('field', 'name');
        formData.append('name', inputValue);
        formData.append('srcImg', 'ddd');

        axios.post(`${process.env.REACT_APP_BESERVERURI}/api/celub/alteration`,
            formData, {headers: {'Context-Type':'multipart/form-data'}})
            .then((res)=>{
                console.log(res);
				beforeStage();
				setLook(true);
            }).catch((error)=>{
				console.log("에러");
            });
	}
    // 첨부파일 변경시 실행
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          setFileInput(event.target.files[0]);
        }
      };
	    // 사진변경
		const onSave = () =>{
			if (!fileInput) {
				alert('이미지를 선택해주세요');
				return;
			  }
			  const formData = new FormData();
			  formData.append('accountId', accountId);
			  formData.append('field', "imgSrc");
			  formData.append('srcImg', fileInput);
			  formData.append('name', inputValue);
	
			  axios.post(`${process.env.REACT_APP_BESERVERURI}/api/celub/alteration`, formData, {
				headers: {
				  'Content-Type': 'multipart/form-data'
				}
			  }).then((res)=>{
				console.log(res);
				closeModal();
				setLook(true);
			  });
		}
	const goCelubBgImg = () => {
		const div1 = document.getElementById('myModal');
		const div2 = document.getElementById('celub-withdraw-overlay');
		if(div1){
			div1.style.display = 'block';
		}
		if(div2){
			div2.style.display = 'block';
		}
	};
	
	const goCelubRules = () => {
		navigate("/celub/rule", {state:{accountId, rules}});
	}
	const beforeStage=()=>{
		const div1 = document.getElementById('withdraw-box4');
		const div2 = document.getElementById('celub-withdraw-overlay');
		if(div1){
			div1.style.display = 'none';
		}
		if(div2){
			div2.style.display = 'none';
		}
	  }
	  const completeChange=()=>{
		setLook(false);
	  }

	return (
		<>
			<CelubHeader value="셀럽로그 관리"/>
			<div className="celub-withdraw-overlay" id="celub-withdraw-overlay"></div>
			<div className="celub-acccount-setting">
				<div className="celub-setting-box1">
					<div className="celub-account-name">
						<h2>{celubAccount.name}</h2>
						<img src={settingImg} onClick={goCelubName}/>
					</div>
					<div className="celub-accountId-box">
						{celubAccount.accountId}
					</div>
				</div>
				<div className="celub-setting-box2">
					<div className ="celub-accountName-box">
						<span className="celub-setting-title">상품명</span>
						<span className="celub-setting-content">셀럽로그(최애적금)</span>
					</div>
					<div className = "celub-interestRate-box">
						<span className="celub-setting-title">적용금리</span>
						<span className="celub-setting-content">연 2.00%</span>
					</div>
					<div className = "celub-createDate-box">
						<span className="celub-setting-title">가입일</span>
						<span className="celub-setting-content">{celubAccount.createDate}</span>
					</div>
				</div>
				
				<div className="celub-setting-box3">
					<div className="celub-setting-label">
						<span>계좌관리</span>
					</div>
					<div className="celub-setting1" onClick={goCelubBgImg}>
						<span>배경사진설정</span>
						<img className='celub-setting-right' alt='right-icon' src={arrow} />
					</div>
					<div className="celub-setting1" onClick={goCelubRules}>
						<span>규칙 설정</span>
						<img className='celub-setting-right' alt='right-icon' src={arrow} />
					</div>
				</div>
				
			</div>
			<div>
                <div className="withdraw-box4 celub-setting-box4" id="withdraw-box4">
                    <div className="withdraw-box6">
                        <p>변경할 이름을 입력해주세요</p>
						<div className="celub-setting-inputBox">
							<input className="celub-changeName" type="text" value={inputValue} onChange={handleInputChange} />
							<span className="celub-clear-input" onClick={clearInput}>×</span>
						</div>
                        <div className="withdraw-box5">
                            <button onClick={beforeStage}>취소</button>
                            <button onClick={gochangeName} className="withdraw-box5-btn">확인</button>
                        </div>
                    </div>
                </div>
				<CommonModal1 msg="변경되었습니다." show={look} onConfirm={completeChange} />
            </div>

			<div id="myModal" className="celub-setting-bgModal">
                <div className="celub-setting-modal-content">
					<div className="celub-setting-modalTitle">
						<div>변경할 사진을 선택해주세요</div>
						<span className="celub-setting-modal-close" onClick={closeModal}>&times;</span>
					</div>
					<input className="celub-setting-modal-input" id="uploadImg" type="file" onChange={handleFileChange}/>
					<CommonBtn type='black' value="저장" onClick={onSave}/>
                </div>
            </div>
		</>
	);
}

export default CelubSetting;
