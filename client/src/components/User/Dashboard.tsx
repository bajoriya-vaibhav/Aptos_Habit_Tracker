import { useParams } from 'react-router-dom';

function Dashboard() {
  const { walletAddress } = useParams();
  return (
    <div>
      <h1>User Profile</h1>
      <p>Wallet Address: {walletAddress}</p>
    </div>
  )
}

export default Dashboard