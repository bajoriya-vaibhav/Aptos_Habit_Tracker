import { Link, useNavigate, useParams } from 'react-router-dom';
import Character from '../../assets/character.gif'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import Logo from '../../assets/logo.png';
import Health from '../../assets/health.png';
import Exp from '../../assets/exp.png';
import Gold from '../../assets/gold.png';

function Profile() {
  const { walletAddress } = useParams();
  const navigate = useNavigate();

  const goTo = ({ path }: { path: string }) => {
    navigate(`/user/${walletAddress}/${path}`);
  };

  return (
    <div className="bg-dark text-white overflow-hidden min-w-screen min-h-screen relative">
      <div className="mx-auto ">
        <div className="flex justify-between items-center z-50 mx-10">
          <Link to="/"><img src={Logo} className='m-4 h-24 w-26'></img></Link>
          <div className='flex flex-center m-10 text-2xl gap-10'>
            {["Dashboard","Tasks", "Collections", "Challenges", "LeadershipBoard"].map((item) => (
              <button onClick={() => goTo({ path: item.toLowerCase() })} className="p-1">{item}</button>
            ))}
          </div>
          <div><WalletSelector /></div>
        </div>
        <div className='m-auto p-20 flex justify-center items-center gap-10'>
          <div className='w-1/2 flex justify-center items-center'><img src={Character} className='h-96 m-auto'></img></div>
          <div className='flex flex-col items-start gap-6 w-1/2'>
            <div className='flex justify-center items-center gap-4'>
              <p>Wallet Add.</p>
              <p>{walletAddress}</p>
            </div>
            <div className='flex justify-center items-center gap-4'>
              <img src={Health} className='h-10'></img>
              <p>Health</p>
              <p>100</p>
            </div>
            <div className='flex justify-center items-center gap-4'>
              <img src={Exp} className='h-10'></img>
              <p>Experience</p>
              <p>0</p>
            </div>
            <div className='flex justify-center items-center gap-4'>
              <img src={Gold} className='h-10'></img>
              <p>Gold</p>
              <p>100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile