import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";

import Character from "../../assets/character.gif";
import Logo from "../../assets/logo.png";
import Health from "../../assets/health.png";
import Exp from "../../assets/exp.png";
import Gold from "../../assets/gold.png";

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
export const aptos = new Aptos(aptosConfig);
export const moduleAddress =
  "0x5c252fcbbe74fa7c08322a034f50691b1bfe6fb855a1af55f930516f11fd4642";

function Profile() {
  const { walletAddress } = useParams();
  const navigate = useNavigate();
  const { account, signAndSubmitTransaction } = useWallet();

  const [userExists, setUserExists] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [loading, setLoading] = useState(true); // Tracks initial loading
  const [userData, setUserData] = useState({
    health: 0,
    experience: 0,
    level: 0,
  });

  const goTo = ({ path }: { path: string }) => {
    navigate(`/user/${walletAddress}/${path}`);
  };

  const fetchUserData = async () => {
    if (!account || !walletAddress) return;
    setLoading(true);
    try {
      const resource = await aptos.getAccountResource({
        accountAddress: account.address,
        resourceType: `${moduleAddress}::user::User`,
      });
      setUserData({
        health: resource.health,
        experience: resource.exp,
        level: resource.level,
      });
      setUserExists(true);
    } catch (error) {
      console.log("User does not exist.");
      setUserExists(false);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    if (!account) return;
    setTransactionInProgress(true);
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::user::create_user`,
        functionArguments: [],
      },
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction(response.hash);
      console.log("User created successfully.");
      fetchUserData(); // Fetch user data after creation
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  useEffect(() => {
    if (walletAddress && account) {
      fetchUserData();
    }
  }, [walletAddress, account]);

  return (
    <div className="bg-dark text-white overflow-hidden min-w-screen min-h-screen relative">
      <div className="mx-auto">
        <div className="flex justify-between items-center z-50 mx-10">
          <Link to="/">
            <img src={Logo} className="m-4 h-24 w-26" />
          </Link>
          <div className="flex flex-center m-10 text-2xl gap-10">
            {["Dashboard", "Tasks", "Collections", "Challenges", "LeadershipBoard"].map((item) => (
              <button onClick={() => goTo({ path: item.toLowerCase() })} className="p-1">
                {item}
              </button>
            ))}
          </div>
          <div>
            <WalletSelector />
          </div>
        </div>

        <div className="m-auto p-20 flex justify-center items-center gap-10">
          {loading ? (
            <p>Loading user data...</p>
          ) : userExists ? (
            <div className="flex w-full justify-center items-center gap-10">
              <div className="w-1/2 flex justify-center items-center">
                <img src={Character} className="h-96 m-auto" />
              </div>
              <div className="flex flex-col items-start gap-6 w-1/2">
                <div className="flex justify-center items-center gap-4">
                  <p>Wallet Add.</p>
                  <p>{walletAddress}</p>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <img src={Health} className="h-10" />
                  <p>Health</p>
                  <p>{userData.health}</p>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <img src={Exp} className="h-10" />
                  <p>Experience</p>
                  <p>{userData.experience}</p>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <img src={Gold} className="h-10" />
                  <p>Level</p>
                  <p>{userData.level}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p>User not found. Create your profile to continue.</p>
              <button
                onClick={createUser}
                disabled={transactionInProgress}
                className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
              >
                {transactionInProgress ? "Creating..." : "Create User"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
