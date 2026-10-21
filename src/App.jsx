import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [passLength, setPassLength] = useState(8);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let currentPassword = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (hasNumbers) {
      string += "0123456789";
    }
    if (hasSpecialChar) {
      string += "!@#$%&";
    }

    for (let i = 0; i < passLength; i++) {
      currentPassword += string[Math.floor(Math.random() * string.length)];
    }
    setPassword(currentPassword);
  }, [passLength, hasNumbers, hasSpecialChar, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator])

  const passwordReference = useRef(null)

  const copyClipboard = useCallback(() => {
    // adds selection effect on the password field
    passwordReference.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#11111b]">
        <div className="w-full max-w-xl rounded-xl bg-[#1e1e2e] p-8 text-[#cdd6f4]">
          <h1 className="mb-6 text-center text-2xl">Password Generator</h1>
          <div className="flex">
            <input
              type="text"
              value={password}
              className="flex-1 rounded-l-lg bg-[#313244] px-4 py-3 text-[#cdd6f4] placeholder-[#6c7086] outline-none"
              placeholder="Password"
              readOnly
              ref={passwordReference}
            />

            <button
              className="cursor-pointer rounded-r-lg bg-[#eba0ac] px-6 font-medium text-[#11111b]"
              onClick={copyClipboard}
            >
              Copy
            </button>
          </div>

            <div className="flex items-center gap-2">
              <input
                type="range"
                min={6}
                max={16}
                value={passLength}
                className="cursor-pointer accent-[#eba0ac]"
                onChange={(e) => {
                  setPassLength(e.target.value);
                }}
              />
              <label>Length: {passLength}</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={hasNumbers}
                // flips value from true -> false or false -> true whenever the checkbox is clicked
                onChange={() => {
                  setHasNumbers((prev) => !prev);
                }}
                id="numberCheck"
                className="cursor-pointer accent-[#eba0ac]"
              />
              <label htmlFor="numberCheck">Numbers</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={hasSpecialChar}
                // flips value from true -> false or false -> true whenever the checkbox is clicked
                onChange={() => {
                  setHasSpecialChar((prev) => !prev);
                }}
                id="charCheck"
                className="cursor-pointer accent-[#eba0ac]"
              />
              <label htmlFor="charCheck">Special Characters</label>
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
