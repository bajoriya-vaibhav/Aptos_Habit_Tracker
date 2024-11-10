import { Link } from "react-router-dom"

function Help() {
  return (
    <div className='min-h-screen min-w-screen overflow-hidden bg-dark relative flex flex-col justify-center items-center gap-10'>
        <Link to="/" className="absolute top-0 left-0 m-10 text-5xl text-white font-light	"><div >X</div></Link>
        <div className='text-5xl text-white text-center'>Stuck AnyWhere<br/> Need Help?</div>
        <div className="w-1/2 text-white text-center relative text-xl font-extrabold">
            It will track your daily tasks and habits. It also make it gamified and fun for the user so that he can publically display their social score(cummulative score based on the activities) and badges they earn and also get the rewards on completing tasks
        </div>
    </div>
  )
}

export default Help