import './App.css'
import Navbar from 'components/Navbar'
import { Outlet } from 'react-router'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
