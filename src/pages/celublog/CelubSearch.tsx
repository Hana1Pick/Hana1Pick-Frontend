import Header from "../../components/Header";
import searchImg from "../../assets/images/celub/search.png";
import { useLocation, useNavigate } from "react-router-dom";
import { CelubListType, CelubWithdrawType } from '../../type/commonType';
import { useState } from "react";
import axios from "axios";
function CelubSearch(){
    //TODO
    const userIdx =localStorage.getItem("userIdx"); 

    const location = useLocation();
    const celubList = location.state;
    const [selectJob, setSelectJob] = useState<string>("ACTOR");
    console.log(celubList);
    const [searchResult, setSearchResult] = useState<CelubListType[]>([]); 
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string>("");
    const [celubWithdraw, setCelubWithdraw] = useState<CelubWithdrawType>({
        userIdx: userIdx??"",
        accPw: 0,
        name: "",
        imgSrc: "",
        outAccId: "",
        celebrityIdx: 0
    });
    const jobChange = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        setSelectJob(e.target.value);
    }
    
    const searchCelub = () =>{
        if(keyword==null||keyword=="") {
            alert("검색어를 입력해주세요");
            return;
        }
        axios.get(`http://${process.env.REACT_APP_BESERVERURI}/api/celub/list/search`,{
                params:{
                        userIdx: userIdx,
                        type: selectJob,
                        name: keyword
                }
            }).then((res)=>{
                console.log("검색리스트",res.data.data);
                setSearchResult(res.data.data);
            }).catch((error)=>{
                alert("실패");
            });
        
    }

    const searchName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };
    const selectCelub = (celubIdx:number, imgSrc:string) =>{
        let result = window.confirm("최애를 선택하시겠습니까?");
        if(result){
            setCelubWithdraw((prevData)=>({
                ...prevData,
                celebrityIdx: celubIdx,
                imgSrc: imgSrc
            }))
            navigate('/celub/withdraw', { state: { ...celubWithdraw, celebrityIdx: celubIdx, imgSrc:imgSrc} });
        }
    }
    return(
        <>
            <Header value="최애 선택"/>
            <div className="celub-search-box">        
                    <select name="job" value={selectJob} onChange={jobChange}>
                        <option value="ACTOR">배우</option>
                        <option value="IDOL">아이돌</option>
                        <option value="ATHLETE">운동선수</option>
                    </select>
                    <input type="text" onChange={searchName} placeholder="이름을 입력하세요" />
                    <img className="celub-search-img" src={searchImg} onClick={searchCelub}/>
            </div>
            <div className="celub-list-box">
                {celubList && celubList.length === 0 ? (
                    <div className="celub-rule-box1"> 
                        선택할 수 있는 연예인이 없습니다. <br/>다시 검색해주세요.
                    </div>
                ) : (
                    <div className="celub-search-box">
                        <table className="celub-table">
                            <tbody>
                                {searchResult.length === 0 ? (
                                    celubList.map((celub: CelubListType, index: number) => (
                                        <tr key={index} onClick={() => selectCelub(celub.idx, celub.thumbnail)}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img className="celub-img" src={celub.thumbnail} alt={celub.name} />
                                            </td>
                                            <td>{celub.name}</td>
                                            <td>{celub.type}</td>
                                        </tr>
                                    ))
                                ) : (
                                    searchResult.map((celub: CelubListType, index: number) => (
                                        <tr key={index}  onClick={() => selectCelub(celub.idx, celub.thumbnail)}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img className="celub-img" src={celub.thumbnail} alt={celub.name} />
                                            </td>
                                            <td>{celub.name}</td>
                                            <td>{celub.type}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default CelubSearch;