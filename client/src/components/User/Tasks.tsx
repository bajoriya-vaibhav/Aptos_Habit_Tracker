import React, { useEffect, useState } from "react";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { Loader2 } from "lucide-react";
import Logo from '../../assets/logo.png';
import { useNavigate, useParams,Link } from "react-router-dom";

type Task = {
  address: string;
  completed: boolean;
  content: string;
  task_id: string;
  createdAt?: string;
  duration?: number;
};

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
export const aptos = new Aptos(aptosConfig);
export const moduleAddress = "0x15666f25b9712319292692152eb8a2a2256e2eb6c7e836714d6aa43b5fcf5759";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDuration, setTaskDuration] = useState<string>("")
  const [newTask, setNewTask] = useState<string>("");
  const { account, signAndSubmitTransaction } = useWallet();
  const [accountHasList, setAccountHasList] = useState<boolean>(true);
  const [transactionInProgress, setTransactionInProgress] = useState<boolean>(false);

  const onWriteTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewTask(value);
  };
  const onDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDuration(event.target.value);
  };
  const fetchList = async () => {
    if (!account) return [];
    try {
      const todoListResource = await aptos.getAccountResource(
          {accountAddress:account?.address,
            resourceType:`${moduleAddress}::todolist::TodoList`}
        );
      setAccountHasList(true);
      // tasks table handle
      const tableHandle = (todoListResource as any).tasks.handle;
      // tasks table counter
      const taskCounter = (todoListResource as any).task_counter;
   
      let tasks = [];
      let counter = 1;
      while (counter <= taskCounter) {
        const tableItem = {
          key_type: "u64",
          value_type: `${moduleAddress}::todolist::Task`,
          key: `${counter}`,
        };
        const task = await aptos.getTableItem<Task>({handle:tableHandle, data:tableItem});
        tasks.push(task);
        counter++;
      }
      // set tasks in local state
      setTasks(tasks);
      console.log(tasks)
    } catch (e: any) {
      setAccountHasList(false);
    }
  };

  const addNewList = async () => {
    if (!account) return [];
  
    setTransactionInProgress(true);

    const transaction:InputTransactionData = {
      data:{
        function:`${moduleAddress}::todolist::create_list`,
        functionArguments:[]
      }
    }
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({transactionHash:response.hash});
      setAccountHasList(true);
    } catch (error: any) {
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
    }
  };

  const onTaskAdded = async () => {
    if (!account) return;
    if (!newTask.trim() || !taskDuration.trim() || isNaN(Number(taskDuration)) || Number(taskDuration) <= 0) {
      alert("Please enter a valid task and duration.");
      return;
    }
    setTransactionInProgress(true);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const duration = Number(taskDuration) * 3600;

    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::todolist::create_task`,
        functionArguments: [newTask, currentTimestamp, duration]
      }
    };

    const latestId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].task_id) + 1 : 1;

    const newTaskToPush = {
      address: account.address,
      completed: false,
      content: newTask,
      task_id: latestId + "",
      timestamp: currentTimestamp,
      duration: duration
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({transactionHash: response.hash});
      // Create a new array based on current state:
      let newTasks = [...tasks];

      // Add item to the tasks array
      newTasks.push(newTaskToPush);
      // Set state
      setTasks(newTasks);
      // clear input text
      setNewTask("");
      fetchList()
    } catch (error: any) {
      console.log("error", error);
    } finally {
      setTransactionInProgress(false); 
    }
  };

  const onCheckboxChange = async (taskId: string) => {
    if (!account) return;
    
    setTransactionInProgress(true);

    const completeTransaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::todolist::complete_task`,
        functionArguments: [taskId]
      }
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(completeTransaction);
      // wait for transaction
      await aptos.waitForTransaction({transactionHash:response.hash});

      setTasks((prevState) => {
        const newState = prevState.map((obj) => {
          // if task_id equals the checked taskId, update completed property
          if (obj.task_id === taskId) {
            return { ...obj, completed: true };
          }

          // otherwise return object as is
          return obj;
        });

        return newState;
      });
    } catch (error: any) {
      console.log("error", error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [account?.address]);

  const { walletAddress } = useParams();
  const navigate = useNavigate();

  const goTo = ({ path }: { path: string }) => {
    navigate(`/user/${walletAddress}/${path}`);
  };

  const timeLeft = (createdAt:string,duration: any) : String=>{
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const createdAtTimestamp = parseInt(createdAt, 10)
    const elapsedTime = currentTimestamp - createdAtTimestamp; // Time elapsed since task creation
    const remainingTime = duration - elapsedTime;
    if (remainingTime > 0) {
      return `Time left: ${Math.floor(remainingTime / 3600)}h ${Math.floor((remainingTime % 3600) / 60)}m`;
    } else {
      return "Task expired";
    }
  }

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

        {transactionInProgress && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {!accountHasList ? (
          <div className="mt-8">
            <button
              disabled={!account}
              onClick={addNewList}
              className=" max-w-md mx-auto block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add new list
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center gap-2">
              <input
                type="text"
                value={newTask}
                onChange={onWriteTask}
                placeholder="Add a Task"
                className="w-1/3 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={taskDuration}
                onChange={onDurationChange}
                placeholder="Duration (hours)"
                className="w-1/6 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
              <button
                onClick={onTaskAdded}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="w-2/3 bg-white rounded-lg shadow m-auto ">
              {tasks.map((task) => (
                <div
                  key={task.task_id}
                  className="flex items-start gap-4 p-4 border-b last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => !task.completed && onCheckboxChange(task.task_id)}
                    disabled={task.completed}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      {task.content}
                    </div>
                    <a
                      href={`https://explorer.aptoslabs.com/account/${task.address}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-blue-600"
                    >
                      {`${task.address.slice(0, 6)}...${task.address.slice(-5)}`}
                    </a>
                    {task.duration && task.createdAt && (
                      <div className="text-sm text-gray-500 mt-1">
                        Duration: {timeLeft(task.createdAt, task.duration)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;