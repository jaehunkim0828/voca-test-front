import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";

function Firstpage() {

  let url = 'http://3.34.140.114:5000/user';

  const alert = useAlert();
  
  const [register, setRegister] = useState({ code : '', password : ''});
  const [code, clearCode] = useState('');
  const [password, clearPassword] = useState('');

  const onChange = (e) => {
    const { value, name } = e.target; 
    setRegister({
      ...register, 
      [name]: value 
    });
  };

  const addUser = (e) => {
    e.preventDefault();
    if (register["code"].length === 0 || register["password"].length === 0) {
      window.alert('빈공간없게 해주세요.');
    } else if (isNaN(register["password"]) || register["password"].length !== 4) {
      window.alert('비밀번호는 숫자와 4자리로 맞춰주세요.');
    } else {
      clearCode('');
      clearPassword('');
      axios.post(url, register)
        .then(data => {
          console.log(data);
          alert.success("만들기 성공");
        })
        .catch(err => alert.error('이 단어장은 이미 생성되어 있는 단어장입니다.'))
    }
  }

  return (
    <div id="login-container">
      <div>
        <div>
          <div 
            style={{ 
              fontSize : "1.5rem",
              color : "#FAF3DD",
              fontWeight : "600"
            }}
          >
            Make my WordNote
          </div>
          <div style={{ fontSize : "0.8rem", color : "#FAF3DD" , marginBottom : "1rem"}}>나만의 단어장을 만들어보세요</div>
        </div>
        <form id="register-container">
          <div id='register-title'>
            <div style={{ fontWeight : "600" , fontSize : "1.3rem" }}>나만의 단어장 만들기</div>
            <div id='register-title-context'>
              <div>
                공부한 영어단어를 기입할 단어장을 만드세요.
              </div>
              <div>
                단어장 이름과 비밀번호로 나만의 단어장을 생성할수 있습니다.
              </div>
              <div>
                만들어진  단어장의 이름과 비밀번호를 입력하면 
              </div>
              <div>
                언제든지 다시 들어갈 수 있도록요
              </div>
            </div>
          </div>
          <div id="register-text">
            <div className="register-text-row">
              <span className="register-text-name">나의 단어장 이름: </span>
              <input 
                name="code"
                placeholder="단어장 입력"
                value={code}
                className="register-inputs"
                onChange={(e) => {
                  onChange(e);
                  clearCode(e.target.value);
                }}
                style={{imeMode : 'active'}}
                type='text'
              />
            </div>
            <div className="register-text-row">
              <span className="register-text-name">단어장 비밀번호: </span>
              <input 
                name="password"
                placeholder="비밀번호 (숫자, 4자리)"
                type="password"
                value={password}
                className="register-inputs"
                onChange={(e) => {
                  onChange(e);
                  clearPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button
            id="register-button"
            onClick={addUser}
          >
            새로운 단어장 만들기
          </button>
        </form>
      </div>
    </div>
  )
}

export default Firstpage;