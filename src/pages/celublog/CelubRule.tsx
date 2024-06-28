import React, { useState, ChangeEvent } from "react";
import CelubHeader1 from "../../layouts/CelubHeader1";
import { CelubRuleType } from "../../type/commonType";

function CelubRule() {
    const [rules, setRules] = useState<CelubRuleType[]>([
        { ruleName: '', ruleMoney: 0 }
    ]);

    const addInput = () => {
        if(rules.length>=10){
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
    };

    return (
        <>
            <CelubHeader1 />
            <div className="celub-rule-totalbox">
                <div>
                    <div className="celub-rulemake-box1">
                        <h2>어떻게 모을지 <br />
                            규칙을 설정해주세요.</h2>
                    </div>
                    <div className="celub-rulemake-box2">
                        <p>최대 50만원씩 10개까지 만들 수 있어요. <br />
                            규칙은 나중에도 수정할 수 있어요.</p>
                    </div>
                </div>

                {rules.map((rule, index) => (
                    <div key={index} className="celub-rulemake-box3">
                        <input
                            placeholder="규칙을 입력해주세요."
                            className="celub-rulemake-input1"
                            type="text"
                            name="ruleName"
                            value={rule.ruleName}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                        <input
                            placeholder="금액을 입력해주세요."
                            className="celub-rulemake-input2"
                            type="number"
                            name="ruleMoney"
                            value={rule.ruleMoney}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                    </div>
                ))}

                <div className="celub-rulemake-box4">
                    <button className="celub-addrule-btn" onClick={addInput}>추가</button>
                    <button id="basicBtn1">완료</button>
                </div>
            </div>
        </>
    );
}

export default CelubRule;
