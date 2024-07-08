import axios from 'axios';

export const kakaoLogout = () => {
  const accessToken = localStorage.getItem('kakaoAccessToken');

  axios({
    method: 'POST',
    url: 'https://kapi.kakao.com/v1/user/logout',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${accessToken}`
    },
  }).then(() => {
    localStorage.removeItem('kakaoAccessToken');
    localStorage.removeItem('userIdx');
    localStorage.removeItem('name');
    localStorage.removeItem('nation');
    localStorage.removeItem('email');
    localStorage.removeItem('profile');
    window.location.href = '/';
  }).catch((e) => {
    console.log('e : ' , e);
    if (e.response.data.code === -401) {
      window.location.href = '/';
    }
  });
}
