import { Link, useNavigate, useParams } from 'react-router-dom';
import Character from '../../assets/character.gif'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import Logo from '../../assets/logo.png';

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
            {["Dashboard", "Collections", "Challenges", "LeadershipBoard"].map((item) => (
              <button onClick={() => goTo({ path: item.toLowerCase() })} className="p-1">{item}</button>
            ))}
          </div>
          <div><WalletSelector /></div>
        </div>
        <img src={Character} className='mx-auto h-80'></img>
      </div>
    </div>
  )
}

export default Profile