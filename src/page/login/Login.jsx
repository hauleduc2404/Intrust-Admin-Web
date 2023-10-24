import React from 'react';
import NewsPage from '../news/NewsPage';
import './Login.css';

export default function Login() {
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
          localStorage.setItem('accessExpiredTime', result.body.token.accessExpiredTime)
          localStorage.setItem('refreshExpiredTime', result.body.token.refreshExpiredTime);
          localStorage.setItem('refreshToken', result.body.token.refreshToken);
          localStorage.setItem('time', Date.now());
          setIsLoggedIn(true);
          window.location.reload();
        } else {
          alert('Mật khẩu hoặc tên đăng nhập không đúng. Vui lòng kiểm tra lại!');
        }
      })
      .catch(err => {
        console.error(err);
        alert("Mật khẩu hoặc tên đăng nhập không đúng. Vui lòng kiểm tra lại!")
        setIsLoggedIn(false);
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }
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
              <input type="text" placeholder="Username" className="user-icon" id="username" onChange={handleInputChangeUser} onKeyPress={handleKeyPress} />
              <input type="password" placeholder="Password" className="pass-icon" id="password" onChange={handleInputChangePassword} onKeyPress={handleKeyPress} />
              <span id="validate"></span>
              <button id="signin" onClick={handleLogin}>Đăng nhập</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
