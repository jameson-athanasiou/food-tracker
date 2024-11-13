import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { DateSelection } from './components/DateSelection'
import 'rsuite/dist/rsuite.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DateSelection />
     
    </>
  )
}

export default App
