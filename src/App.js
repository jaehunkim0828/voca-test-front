import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';

import Main from './pages/Main';
import Firstpage from './pages/Firstpage';
import './App.css';

function App(props) {

  let url = 'http://localhost:5000/login';

  const [login, setLogin] = useState("실패");

  const [loginData, setLoginData] = useState({ code : '', password : ''});

  const onChange = (e) => {
    const { value, name } = e.target; 
    setLoginData({
      ...loginData, 
      [name]: value 
    });
  };

  const goMain = () => {
    setLogin('성공');
  }

  const refresh = () => {
    window.location.reload();
  }

  const goLogin = async () => {
    await axios.get(url);  
    setLogin('실패');
  }

  const check = (e) => {
    e.preventDefault();
    axios.post(url, loginData)
      .then(req => {
        const token = req.data.userId;
        localStorage.setItem('userId', token);
        goMain();
      })
      .catch(err => {
        window.alert('아이디, 비밀번호를 확인해주세요.');
      })
  }

  useEffect(() => {
    let result = '실패';
    async function post() {
      const data = await axios.post(url,{});
      if (data.data) {
        result = '성공';
      }
      setLogin(result);
    }
    post();
    return () => {
    };
  }, []);

  return (
    <div style={{ height : "100%"}}>
      <div id="nav">
        <button id="logo" onClick={refresh}>
          <div>Word Note</div>
          <div 
            style={{ 
              fontSize : "1.1rem",
              width : "100%",  
              display : "flex", 
              justifyContent : "center"
            }}
          >
            나만의 단어장
          </div>
        </button>
        {
          login === '실패' ?
          <form
            className="nav-login"
            onSubmit={check}
          >
            <input 
              onChange={(e) => onChange(e)}
              className="login-inputs"
              placeholder="단어장 입력"
              name="code"
              type='text'
            />
            <input 
              onChange={(e) => onChange(e)}
              className="login-inputs"
              placeholder="비밀번호 입력"
              name="password"
              type='password'
            />
            <button className ="login-button" type="submit" >
              로그인
            </button>
          </form>
            :
          <div className='logout-container'>
            <button
              className ="login-button"
              onClick={goLogin}
            >
              로그아웃
            </button>
          </div>
        }
      </div>
      <div style={{ height : '100%' }}>
        {
          login === '성공' ?
          <Main />
            :
          <Firstpage />
        }
      </div>
    </div>
  );
}

export default withCookies(App);