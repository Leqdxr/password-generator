import { useState, useCallback } from "react";
import "./App.css";

function App() {
  const [passLength, setPassLength] = useState(8);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let currentPassword = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (hasNumbers) {
      string += "0123456789"
    }
    if (hasSpecialChar) {
      string+= "!@#$%&"
    }

    for (let i = 0; i < passLength; i++) {
      currentPassword += string[Math.floor(Math.random() * (string.length))]
    }
    setPassword(currentPassword)
  }, [passLength, hasNumbers, hasSpecialChar])


  return (
    <>
      <div className="">
        <h1 className="text-4xl">Password Generator</h1>
        <div className="">
          <input
            type="text"
            value={password}
            className=""
            placeholder="Password"
            readOnly
          />

          <button className="">Copy</button>
        </div>

        <div className="">
          <input
            type="range"
            min={6}
            max={16}
            className="cursor-pointer"
            onChange = {(e) => {setPassLength(e.target.value)}}
          />
          <label>Length: {passLength}</label>
        </div>

        <div className="">
          <input
            type="checkbox"
            defaultChecked={hasNumbers}
            // flips value from true -> false or false -> true whenever the checkbox is clicked
            onChange={() => {
              setHasNumbers((prev) => !prev);
            }}
            id="numberCheck"
          />
          <label htmlFor="numberCheck">Numbers</label>
        </div>

        <div className="">
          <input
            type="checkbox"
            defaultChecked={hasSpecialChar}
            // flips value from true -> false or false -> true whenever the checkbox is clicked
            onChange={() => {
              setHasSpecialChar((prev) => !prev);
            }}
            id="charCheck"
          />
          <label htmlFor="charCheck">Special Characters</label>
        </div>
      </div>
    </>
  );
}

export default App
