import React, { ChangeEvent } from 'react';
import { PhotoCardContext } from '../../contexts/PhotoCardContextProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './PhotoCardStyle.scss';
import Header from '../../components/Header';
import info from '../../assets/images/photo-card/photo-card-info.gif';
import CommonBtn from '../../components/button/CommonBtn';

function ImagePage() {
  const { setImage }: any = useContext(PhotoCardContext);

  const navigate = useNavigate();
  const getImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      navigate('/photo-card/sticker');
    }
  };
  const goCamera = () => {
    navigate("/celub/photo");
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
        <CommonBtn type='pink' value="셀럽한컷 찍기" onClick={goCamera}/>
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
    </div>
  );
}

export default ImagePage;
