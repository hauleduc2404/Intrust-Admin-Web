import React from 'react';
import NewsPage from '../news/NewsPage';
import './Login.css';

function FormatDate (date) {
  const dataObject = new Date(date);
  const day = dataObject.getDate();
  const month = dataObject.getMonth() + 1;
  const year = dataObject.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

export default function Login () {
  const [username, setUserName] = React.useState();
  const [password, setPassword] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('accessToken') != null);
  const handleInputChangeUser = (e) => {
    setUserName(e.target.value);
  };
  const handleInputChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(
      {
          "body": {
              "username": username,
              "password": password
          }
      }
  );
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch('https://intrustca.vn/api/auth/signin', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.responseCode === '200') {
          localStorage.setItem('accessToken', result.body.token.accessToken);
          localStorage.setItem('refreshExpiredTime', result.body.token.refreshExpiredTime);
          localStorage.setItem('refreshToken', result.body.token.refreshToken);
          localStorage.setItem('accessExpiredToken', result.body.token.accessExpiredToken);
          localStorage.setItem('time', Date.now());
          setIsLoggedIn(true);
        } else {
          alert('Mật khẩu hoặc tên đăng nhập không đúng. Vui lòng kiểm tra lại!');
        }
      })
      .catch(err => {
        console.error(err);
        setIsLoggedIn(false);
      });
  };
  if (isLoggedIn) {
    return <NewsPage />;
  } else {
    return (
            <div className="main">
                <div className="login-body">
                    <div className="login">
                        <div className="loginLeft">
                            <img src={require('../../assets/img/key-solution.png')} alt=""></img>
                        </div>
                        <div className="loginRight">
                            <h1>Welcome!</h1>
                            <input type="text" placeholder="Username" className="user-icon" id="username" onChange={handleInputChangeUser} />
                            <input type="password" placeholder="Password" className="pass-icon" id="password" onChange={handleInputChangePassword} />
                            <span id="validate"></span>
                            <button id="signin" onClick={handleLogin}>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}
