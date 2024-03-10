import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  //ref hook
  const passwordRef = useRef(null)

  const passwodGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*()_+"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(Password)
  }, [Password])
  
  useEffect(() => {passwodGenrator()}, [length, numberAllowed, characterAllowed, passwodGenrator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={Password} className='w-full outline-none py-1 px-3' placeholder='password' readOnly ref={passwordRef} />
          <button onClick={copyPasswordToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:text-black'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100} value={length} className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numberAllowed} id="numberInput"
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={characterAllowed} id="charInput"
              onChange={() => setcharacterAllowed(!characterAllowed)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
