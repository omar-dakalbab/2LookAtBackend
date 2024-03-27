import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CardForm from './Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CardForm />
    </>
  )
}

export default App
