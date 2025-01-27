import React, { useState, useEffect, useCallback } from "react";
import { FaClipboard } from "react-icons/fa"; // Clipboard-Icon

const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [isCopied, setIsCopied] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  // Memoize generatePassword with useCallback
  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSpecialChars) charset += "!@#$%^&*()_+[]{}|;:,.<>?/";

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  // Generate password on load or when any settings change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center py-12">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6 animate__animated animate__fadeIn">
          Password Generator
        </h1>

        <div className="mb-4">
          <label htmlFor="passwordLength" className="block text-sm font-medium text-gray-700 mb-2">
            Password Length
          </label>
          <input
            type="number"
            id="passwordLength"
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            min="8"
            max="32"
            className="w-full px-4 py-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Include Uppercase Letters</label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="mr-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Include Lowercase Letters</label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
            className="mr-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Include Numbers</label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Include Special Characters</label>
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
            className="mr-2"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full px-4 py-2 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
            placeholder="Generated password will appear here"
            style={{ letterSpacing: "2px" }}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 flex items-center"
          >
            <FaClipboard className="mr-2" />
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
