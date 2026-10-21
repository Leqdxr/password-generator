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

    </>
  );
}
