 import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  const [password, setpassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstwxyz";

    if (number) str += "0123456789"
    if (char) str += "!@#$%^&*_~"

    for (let i = 1; i <= length; i++) {
      let charnum = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charnum);
    }
    setpassword(pass);
  }, [length, number, char, setpassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, char, passwordGenerator])

  //useref hook

  const passwordRef = useRef(null);

  const copypassword = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password])


  return (
    <>
      <div className="d1">
        <h1>Password Generator</h1>
        <div className="c2">
          <div className="input-box">
            <input type="text"
              value={password}
              className='add-value'
              placeholder='Passsword'
              readOnly
              ref={passwordRef} />
            <button
              onClick={copypassword}>Copy</button>
          </div>
        </div>
        <div className="range">
          <div>
            <input type="range"
              min={6}
              max={16}
              value={length}
              className='input'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length:{length}</label>
          </div>
          <div>
            <input type="checkbox"
              defaultChecked={number}
              id='numberInput'
              onChange={() => {
                setnumber((prev) => !prev);
              }} />
            <label>Numner</label>
          </div>
          <div>
            <input type="checkbox"
              defaultChecked={number}
              id='charInput'
              onChange={() => {
                setchar((prev) => !prev);
              }} />
            <label>Char</label>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
