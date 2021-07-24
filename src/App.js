import { useState } from 'react';
import { useBeforeunload } from "react-beforeunload";

import './App.css';
import feedbackImg from './images/feedback2.png';

function App() {

  let currentVoca;
  let currentEngVoca;
  
  const [value, setValue] = useState(true);

  const [testValue, setTestValue] = useState(false);

  const [text, clearText] = useState('');

  const [vocalist, setVoca] = useState([]);

  const [voca, changeVoca] = useState(undefined);

  const [engText, clearEngText] = useState('');

  const [engVocalist, setEngVoca] = useState([]);

  const [engVoca, changeEngVoca] = useState(undefined);

  const [testVoca2, changeTest] = useState([]);

  const [inputs, setInputs] = useState({});

  const [matchInputs, setMatchInputs] = useState({});

  const [score, setScore] = useState('');

  const [conclusion, setConclusion] = useState([]); 

  const addVoca = (e) => {
    e.preventDefault();
    currentVoca = vocalist;
    currentVoca.push(voca);
    setVoca(currentVoca);
    currentEngVoca = engVocalist;
    currentEngVoca.push(engVoca);
    setEngVoca(currentEngVoca);
    clearText('');
    clearEngText('');
    changeVoca('');
    changeEngVoca('');
  }

  const refresh = () => {
    window.location.reload();
  }

  const startTest = () => {

    var testVoca = vocalist.slice();
    var testEngVoca = engVocalist.slice();
    var currentIndex = testVoca.length, randomIndex;

    //만약에 conclusion
    
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [testVoca[currentIndex], testVoca[randomIndex]] = [
      testVoca[randomIndex], testVoca[currentIndex]];
      [testEngVoca[currentIndex], testEngVoca[randomIndex]] = [
      testEngVoca[randomIndex], testEngVoca[currentIndex]];
    }
    changeTest(testVoca);
    var testObj = {};
    for (let i = 0; i < testVoca.length; i += 1) {
      testObj = {
        ...testObj,
        [testVoca[i]]: testEngVoca[i],
      }
    }
    setInputs(testObj);
    setTestValue(true);
    setValue(true);
  }
  
  const onChange = (e) => {
    const { value, name } = e.target; 
    setMatchInputs({
      ...matchInputs, 
      [name]: value 
    });
  };

  const removeVoca = (data, i) => {
    // vocalist.splice(i, 1)
    // engVocalist.splice(i, 1)
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setVoca(vocalist.filter(voca => voca !== data));
      setEngVoca(engVocalist.filter(voca => voca !== engVocalist[i]));
      return;
    } else {
      return;
    }  
  }
  
  const finishTest = () => {
    // let conclusionAnswer;
    let count = 0;
    let score;
    const groupConclusion = [];
    

    for (const prop in inputs) {
      if ( inputs[prop] ===  matchInputs[prop] ) { 
        // conclusionAnswer = `${prop} (${matchInputs[prop]}) 정답`;
        // groupConclusion.push(conclusionAnswer);
        const obj = {};
        obj.question = prop;
        obj.answer = matchInputs[prop];
        obj.value = "정답";
        groupConclusion.push(obj);
        count += 1;
      } else {       
        // conclusionAnswer = `${prop} (${matchInputs[prop]}) 오답`;
        // groupConclusion.push(conclusionAnswer);
        const obj = {};
        obj.question = prop;
        obj.answer = matchInputs[prop];
        obj.value = "오답";
        groupConclusion.push(obj);
      }
    }
    console.log(matchInputs);

    score = `${groupConclusion.length}개 중에 ${count}정답`;
    setConclusion(groupConclusion);
    setValue(false);
    setScore(score);
    setMatchInputs({});

  }

  const goMain = () => {
    setTestValue(false);
    setValue(true);
  }

  useBeforeunload((event) => 
    event.preventDefault()
  );  

  return (
    <div style={{background : "#8FC0A9"}}>
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
        <button
          style={{
            border : "none",
            background : "#8FC0A9",
            width : "5rem",
            height : "4rem",
            borderRadius : "5px",
            margin : " 0 6rem"
          }}
        >
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5f-w3Lw-m2J-WPaKTbdAveReoWglcXu53QhFCCYEFLAY87w/viewform?usp=sf_link">
            <img 
              src={feedbackImg} 
              alt="none" 
              style={{
                width: "3rem"
              }}
            />
          </a>
        </button>
      </div>
      <div id="container">
        {
          !testValue ?
          <div id='page-1'>
            <div>
              <div 
                style={{ 
                  fontSize : "1.5rem",
                  color : "#FAF3DD",
                  marginBottom : "1rem"
                }}
              >
                Enter the Words
              </div>
              <form
                onSubmit={addVoca}
              >
                <div style={{ margin : "0 0 1rem 0" }}>
                  <div style={{ fontWeight : "600" , fontSize : "1.3rem" }}>영단어 기록하기</div>
                  <div style={{ fontSize : "0.5rem" }}>단어장에 영단어를 기입하십시요</div>
                </div>
                <div className="voca-input">
                  <input
                    placeholder="한글 입력"
                    className="input-style"
                    value={text}
                    onChange={(e) => {
                      changeVoca(e.target.value);
                      clearText(e.target.value);
                    }}
                  />
                </div>
                <div style={{ marginBottom : "4rem" }} className="voca-input">
                  <input
                    placeholder="영어 입력"
                    className="input-style"
                    value={engText}
                    onChange={(e) => {
                      changeEngVoca(e.target.value);
                      clearEngText(e.target.value);
                    }}
                  />
                </div>
                <button
                  type='submit'
                  id='Jbutton'
                >
                  기록하기
                </button>
              </form>
              <div 
                style={{
                  width : "100%",
                  background : "white",
                  height : "7rem",
                  borderRadius : "5px",
                  display : "flex",
                  flexDirection : "column",
                  padding : "1rem 0",
                  alignItems : "center",
                  justifyContent : "space-around"
                }}
              >
                <div style={{ fontSize : "1.2rem", fontWeight : "600" }}>단어 시험 보기</div>
                <div style={{ fontSize : "0.8rem" }}>열심히 공부했나요? 영단어 테스트 보기</div>
                <button
                  className="test-button"
                  onClick={startTest}
                >
                  시험 보기
                </button>
              </div>
            </div>
            <div className="voca-container">
              <div style={{ marginBottom : "1rem"}}>
                <span 
                  style={{ 
                    fontSize : "1.5rem",
                    color : "#FAF3DD"
                  }}
                >
                  My WordBook
                </span>
                <span style={{ fontSize : "0.8rem", color : "#FAF3DD" }}>내가 기록한 단어</span>
              </div>
              <div id="vocabulary">
                <div id="vocabulary-intro">
                    <div className='row-vocalist'>
                        {/* <div className="voca-number-element">순서</div> */}
                        <div className="voca-element">한글</div>
                        <div className="voca-element">영어</div>
                        <div className="voca-remove-cover">
                          <div className="voca-remove-emty"/>
                        </div>
                      </div>
                      <hr className="driver" />
                </div>
                {
                  vocalist.map((data, i) => (
                    <div style={{ width : "100%" }}>
                      <div className='row-vocalist'>
                        {/* <div className="voca-number-element">{i + 1}</div> */}
                        <div className="voca-element" key={i}>{data}</div>
                        <div className="voca-element" key={i + 'en'}>{engVocalist[i]}</div>
                        <div className="voca-remove-cover">
                          <button 
                            className="voca-remove"
                            onClick={() => removeVoca(data, i)}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                      <hr className="driver" />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
            :
          <div>
            {
              !value ?
              <div>
                <div style={{ marginBottom : "1rem"}}>
                  <span 
                    style={{ 
                      fontSize : "1.5rem",
                      color : "#FAF3DD"
                    }}
                  >
                    Test Result
                  </span>
                  <span style={{ fontSize : "0.8rem", color : "#FAF3DD" }}>시험 결과</span>
                </div>
                  <div className="test-container">
                    <div style={{ width : "90%" }}>
                        <div className='row-testlist-2'>
                            <div className="voca-element">입력한 한글</div>
                            <div className="voca-element">입력한 영어</div>
                            <div className="voca-element">결과</div>
                          </div>
                          <hr className="driver" />
                    </div>
                    {
                      conclusion.map((data, i) => (
                        <div style={{ width : "90%"}}>
                          <div className='row-testlist-2'>
                            <div className="voca-element">{data.question}</div>
                            <div className="voca-element">{data.answer}</div>
                            <div 
                              className="voca-element" 
                              style={{ 
                                color : data.value === "정답" ? "#39A2DB" : "#F55C47"
                              }}
                            >
                              {data.value}
                            </div>
                          </div>
                            <hr className="driver" />
                        </div>
                      ))
                    }
                  </div>
                  <div style={{ width : "100%", display : "flex", justifyContent : "space-between"}}>
                    <div style={{ fontSize : "1.2rem", fontWeight : "600", color : "#FAF3DD"}}>{score}</div>
                    <div className="finish-button-container">
                      <button 
                        className="finish-button"
                        onClick={startTest}
                      >
                        재시험 보기
                      </button>
                      <button
                        className="finish-button"
                        onClick={goMain}
                      >
                        돌아가기
                      </button>
                    </div>
                  </div>
                </div>
                  :
                <div>
                <div style={{ marginBottom : "1rem"}}>
                  <span 
                    style={{ 
                      fontSize : "1.5rem",
                      color : "#FAF3DD"
                    }}
                  >
                    Test Word
                  </span>
                  <span style={{ fontSize : "0.8rem", color : "#FAF3DD" }}>단어시험</span>
                </div>
                <div className="test-container">
                  <div style={{ width : "90%" }}>
                      <div className='row-testlist'>
                          <div className="voca-element">한글</div>
                          <div className="voca-element">영어</div>
                        </div>
                        <hr className="driver" />
                  </div>
                  {
                    testVoca2.map((data, i) => (
                      <div style={{ width : "90%" }}>
                        <div className='row-testlist'>
                          <div className="voca-element" key={i}>{data}</div>
                          <div className="voca-element">
                            <input 
                              className="test-inputs" 
                              name={data} 
                              onChange={onChange}
                              autocomplete='off'
                            />
                          </div>
                        </div>
                          <hr className="driver" />
                      </div>
                    ))
                  }
                </div>
                <div id="finish-button-container">
                  <button className="finish-button" onClick= {finishTest}>시험종료</button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App;
