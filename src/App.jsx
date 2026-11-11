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
      <div className="min-h-screen flex items-center justify-center bg-[#dce0e8] px-4">
        <div className="w-full max-w-md rounded-xl bg-[#eff1f5] p-8 shadow-sm shadow-[#bcc0cc]">
          <h1 className="mb-6 text-center text-xl font-semibold text-[#4c4f69]">Password Generator</h1>
          <div className="flex overflow-hidden rounded-lg border border-[#ccd0da]">
            <input
              type="text"
              value={password}
              className="flex-1 bg-[#e6e9ef] px-4 py-2.5 text-sm text-[#4c4f69] placeholder-[#9ca0b0] outline-none font-mono"
              placeholder="Password"
              readOnly
              ref={passwordReference}
            />

            <button
              className="cursor-pointer bg-[#8839ef] px-5 py-2.5 text-sm font-medium text-[#eff1f5] hover:bg-[#7c2fdb]"
              onClick={copyClipboard}
            >
              Copy
            </button>
          </div>

            <div className="mt-5 flex items-center gap-3">
              <input
                type="range"
                min={6}
                max={16}
                value={passLength}
                className="flex-1 cursor-pointer"
                onChange={(e) => {
                  setPassLength(e.target.value);
                }}
              />
              <label className="text-sm font-medium text-[#6c6f85] tabular-nums">Length: {passLength}</label>
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              <input
                type="checkbox"
                defaultChecked={hasNumbers}
                // flips value from true -> false or false -> true whenever the checkbox is clicked
                onChange={() => {
                  setHasNumbers((prev) => !prev);
                }}
                id="numberCheck"
                className="cursor-pointer"
              />
              <label htmlFor="numberCheck" className="text-sm text-[#4c4f69] cursor-pointer select-none">Numbers</label>
            </div>

            <div className="mt-3 flex items-center gap-2.5">
              <input
                type="checkbox"
                defaultChecked={hasSpecialChar}
                // flips value from true -> false or false -> true whenever the checkbox is clicked
                onChange={() => {
                  setHasSpecialChar((prev) => !prev);
                }}
                id="charCheck"
                className="cursor-pointer"
              />
              <label htmlFor="charCheck" className="text-sm text-[#4c4f69] cursor-pointer select-none">Special Characters</label>
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
