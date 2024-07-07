import { useState, ChangeEvent, useEffect, FocusEvent } from 'react';
import CelubHeader1 from '../../components/Header';
import { CelubRuleType } from '../../type/commonType';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './CelublogStyle.scss';
import qs from 'qs';
import CommonModal1 from '../../components/modal/CommonModal3';

function CelubRule() {
	const location = useLocation();
	const { accountId, ruleList } = location.state;
	console.log(accountId);
	const navigate = useNavigate();
	const [rules, setRules] = useState<CelubRuleType[]>(ruleList || []);
	const [look, setLook] = useState(false);
	useEffect(() => {
		axios
			.post(
				`${process.env.REACT_APP_BESERVERURI}/api/celub/list/detail`,
				qs.stringify({ accountId: accountId })
			)
			.then((res) => {
				console.log(res.data.data);
				setRules(
					res.data.data.ruleInfo.map((rule: any) => ({
						ruleName: rule.ruleName,
						ruleMoney: rule.ruleMoney,
					}))
				);
			})
			.catch((error) => {
				console.log('실패');
			});
	}, []);
	const addInput = () => {
		if (rules.length >= 10) {
			alert('규칙은 최대 10개 까지만 생성 가능합니다.');
			return;
		}
		setRules([...rules, { ruleName: '', ruleMoney: 0 }]);
	};

	const handleInputChange = (
		index: number,
		event: ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target;
		const newRules = [...rules];
		if (name === 'ruleName') {
			newRules[index].ruleName = value;
		} else if (name === 'ruleMoney') {
			newRules[index].ruleMoney = parseFloat(value);
		}
		setRules(newRules);
		console.log(rules);
	};

	const handleInputFocus = (index: number, event: FocusEvent<HTMLInputElement>) => {
		const newRules = [...rules];
		if (newRules[index].ruleMoney !== 0) {
			newRules[index].ruleMoney = 0; // 기본 등록된 데이터 삭제
			setRules(newRules);
		}
		event.target.select(); // 커서를 보여줌
	};

	const addRules = () => {
		let data = {
			accountId: accountId,
			ruleList: rules.map((rule) => ({
				ruleName: rule.ruleName,
				ruleMoney: rule.ruleMoney,
			})),
		};
		axios
			.post(`${process.env.REACT_APP_BESERVERURI}/api/celub/rule`, data)
			.then((res) => {
				console.log('확인하는중' + res.data.data);
				setLook(true);
			})
			.catch((error) => {
				console.log('실패');
			});
	};
	const completeChange = () => {
		navigate('/celub/detail', { state: accountId });
	};

	return (
		<>
			<CelubHeader1 value='규칙 설정' />
			<div className='celub-rule-totalbox'>
				<div>
					<div className='celub-rulemake-box1'>
						<h2>
							어떻게 모을지 <br />
							규칙을 설정해주세요.
						</h2>
					</div>
					<div className='celub-rulemake-box2'>
						<p>
							최대 50만원씩 10개까지 만들 수 있어요. <br />
							규칙은 나중에도 수정할 수 있어요.
						</p>
					</div>
				</div>
				{rules.map((rule, index) => (
					<div key={index} className='celub-rulemake-box3'>
						<input
							placeholder='규칙을 입력해주세요.'
							className='celub-rulemake-input1'
							type='text'
							name='ruleName'
							value={rule.ruleName}
							onChange={(event) => handleInputChange(index, event)}
						/>
						<input
							placeholder='금액을 입력해주세요.'
							className='celub-rulemake-input2'
							type='number'
							name='ruleMoney'
							value={rule.ruleMoney}
							onChange={(event) => handleInputChange(index, event)}
							onFocus={(event) => handleInputFocus(index, event)}
						/>
					</div>
				))}

				<div className='celub-rulemake-box4'>
					<button className='celub-addrule-btn' onClick={addInput}>
						추가
					</button>
					<button id='basicBtn1' onClick={addRules}>
						완료
					</button>
				</div>
			</div>
			<CommonModal1
				msg=' 규칙이 변경되었습니다.'
				show={look}
				onConfirm={completeChange}
			/>
		</>
	);
}

export default CelubRule;
