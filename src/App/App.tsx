import './App.css'
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from 'components/Navbar'
import { Outlet } from 'react-router'
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  return (
    <>
      <SkeletonTheme baseColor="#000000" highlightColor="#4f4f4f"></SkeletonTheme>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
