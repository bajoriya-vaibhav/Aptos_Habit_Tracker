import Logo from '../assets/logo.png'
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Link } from 'react-router-dom'; 
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { account } = useWallet(); 
  const navigate = useNavigate();

  const handleConnect = async () => {
    if (account?.address) {
      navigate(`/user/${account.address}`);
    } else {
      alert('Please connect your wallet to access the Dashboard.');
    }
  };
  return (
    <div className="flex justify-between items-center z-50 mx-10">
        <img src={Logo} className='m-4 h-28 w-32'></img>
        <div className='flex flex-center m-10 text-4xl text-white gap-10'>
          <Link to ="/about" className="p-1">About</Link>
          <Link to ="/help" className="p-1">Help</Link>
          <button onClick={handleConnect} className="p-1 ">
            Dashboard
          </button>
          <div><WalletSelector /></div>
        </div>
    </div>
  )
}

export default Navbar