import React, { ChangeEvent } from 'react';
import { PhotoCardContext } from '../../contexts/PhotoCardContextProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './PhotoCardStyle.scss';
import Header from '../../components/Header';
import info from '../../assets/images/photo-card/photo-card-info.gif';
import CommonBtn from '../../components/button/CommonBtn';
const photoList: { [key: string]: string } = {
  sticker1: '/photo/sticker1.png',
  sticker2: '/photo/sticker2.png',
  sticker3: '/photo/sticker3.png',
  sticker4: '/photo/sticker4.png',
  sticker5: '/photo/sticker5.png',
  sticker6: '/photo/sticker6.png',
  sticker7: '/photo/sticker7.png'
}
function ImagePage() {
  const { setImage }: any = useContext(PhotoCardContext);
  const navigate = useNavigate();
  const getImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      navigate('/photo-card/sticker');
    }
  };
  const goCamera = (photoUrl:string) => {
    alert(photoUrl);
    navigate("/celub/photo", {state:photoUrl});
  }
  const closeModal = () => {
		const div1 = document.getElementById('myModal');
		const div2 = document.getElementById('celub-withdraw-overlay');
		const div3 = document.getElementById('outmoney-box4'); 
		if (div1) {
			div1.style.display = 'none';
		}
		if (div2) {
			div2.style.display = 'none';
		}
		if (div3) {
			div3.style.display = 'none';
		}
	};
  const showModal = () =>{
      const div1 = document.getElementById('myModal');
      const div2 = document.getElementById('celub-withdraw-overlay');
      if (div1) {
        div1.style.display = 'block';
      }
      if (div2) {
        div2.style.display = 'block';
      }
  }
  return (
    <div id='photo-card'>
      <Header value='최애와 한컷' />
      <div id='mainForCenter'>
        <div id='top'>
          좋아하는 연예인과
          <br />
          함께 사진을 찍어보세요.
        </div>
        <div id='bottom'>
          <img id='photo-card-info' src={info} alt='info' />
        </div>
      </div>
      <div id='nextBtn'>
        <CommonBtn type='pink' value="최애와 한컷 찍기" onClick={showModal}/>
        <label htmlFor='file'>
          <div className='basicInputFile1'>사진 선택하기</div>
        </label>
        <input
          type='file'
          id='file'
          onChange={getImage}
          style={{ display: 'none' }}
        />
      </div>
      <div className='celub-withdraw-overlay' id='celub-withdraw-overlay'></div>
			<div id='myModal' className='celub-setting-bgModal celub-photo-bgModal'>
				<div className='celub-setting-modal-content'>
					<div className='celub-setting-modalTitle celub-photo-modalTitle'>
						<div>원하는 스티커를 선택해주세요
            <span className='celub-setting-modal-close' onClick={closeModal}>
							&times;
						</span>
            </div>
            <div className="celub-sticker-box">
              {Object.entries(photoList).map(([key, src]) => (
                <img key={key} src={src} className="photo-img" alt={key} onClick={() => goCamera(src)}/>
              ))}
            </div>
					</div>
				</div>
			</div>
    </div>
  );
}

export default ImagePage;
