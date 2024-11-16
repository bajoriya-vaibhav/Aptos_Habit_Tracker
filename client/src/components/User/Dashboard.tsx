import { Link, useNavigate, useParams } from 'react-router-dom';
import Character from '../../assets/character.gif'
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import Logo from '../../assets/logo.png';
import Health from '../../assets/health.png';
import Exp from '../../assets/exp.png';
import Gold from '../../assets/gold.png';
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
export const aptos = new Aptos(aptosConfig);
export const moduleAddress = "0x15666f25b9712319292692152eb8a2a2256e2eb6c7e836714d6aa43b5fcf5759";

function Profile() {
  const { walletAddress } = useParams();
  const navigate = useNavigate();
  const { account } = useWallet();

  const [userData, setUserData] = useState({
    health: 0,
    experience: 0,
    level: 0,
  });

  const goTo = ({ path }: { path: string }) => {
    navigate(`/user/${walletAddress}/${path}`);
  };

  const fetchUserData = async () => {
    if (!account) return [];
    try {
      const resource = await aptos.getAccountResource(
        {accountAddress:account?.address,
          resourceType:`${moduleAddress}::todolist::TodoList`}
      );
      setUserData({
        health: resource.data.health,
        experience: resource.data.exp,
        level: resource.data.level,
      });
    } catch (error) {
      console.log("User does not exist. Creating user...");
    }
  };
  useEffect(() => {
    if (walletAddress) {
      fetchUserData();
    }
  }, [walletAddress]);
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
              <p>{userData.experience}</p>
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