import Logo from '../assets/logo.png'
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Link } from 'react-router-dom'; 
function Navbar() {
  return (
    <div className="flex justify-between z-50 mx-10">
        <img src={Logo} className='m-4 h-28 w-32'></img>
        <div className='flex flex-center m-10 text-4xl text-white gap-10'>
          <Link to ="/about" className="p-1">About</Link>
          <Link to={`/user/`} className="p-1">Dashboard</Link>
          <div><WalletSelector /></div>
        </div>
    </div>
  )
}

export default Navbar