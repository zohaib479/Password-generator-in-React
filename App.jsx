import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlenght] = useState(8)
  const [Number, setNumber] = useState(false)
  const [Character, setCharacters] = useState(false)
  const [password, setPassword] = useState("")
  //ref hook
  const passref = useRef(null)
  const copyPasswordToClip = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    passref.current?.select()
    passref.current?.setSelectionRange(0,99)
  }, [password])
  //using callstate to optimize the solution 
  const randomPasswordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (Number) str += "123456789"
    if (Character) str += "!@#$%^&*()"

    for (let i = 0; i < length; i++) {
      const element = Math.floor(Math.random() * str.length - 1)
      pass += str.charAt(element);

    }
    setPassword(pass)
  }, [length, Number, Character])
  //for calling the optimized function we have to use USE EFFECT (HOOK)
  useEffect(() => {
    randomPasswordgenerator()
  }, [length, Number, Character, randomPasswordgenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg  my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden b-4">
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-4 '
            placeholder='Password'
            readOnly
            ref={passref}
          />
          <button onClick={copyPasswordToClip} className='outline-none hover:bg-blue-300 bg-blue-700 text-white px-3 py-0.5 shrink-0'> Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setlenght(e.target.value)
              }} />
            <label htmlFor="">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={Number}
              id='numberInput'
              onChange={() => {
                setCharacters((prev) => (!prev))//setNumber(!number)
              }} />
            <label htmlFor="numberInput">numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={Character}
              id='CharacterInput'
              onChange={() => {
                setNumber((prev) => (!prev))//setNumber(!number)
              }} />
            <label htmlFor="CharacterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
