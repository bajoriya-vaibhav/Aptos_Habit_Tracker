import Stars from '../assets/stars.gif'
import Square from '../assets/sqaureframe.png'

function About() {
  return (
    <div className='min-w-screen min-h-screen relative flex flex-col justify-center items-center'>
        <img src = {Stars} className="w-screen h-screen absolute top-0 left-0 object-cover -z-10"></img>
        <div className="z-50 text-xl my-20">
            <div className='py-6'>
            <div className="-rotate-2 m-auto relative w-[500px] h-[110px] flex items-center justify-center bg-cover bg-center text-6xl font-extrabold text-center" style={{ backgroundImage: `url(${Square})` }}>
                Everybody's
            </div>
            <div className='rotate-2 text-pink text-6xl font-extrabold text-center'>Invited</div>
            <div className='text-2xl text-white w-1/2 text-center m-auto my-10'>
                Habitica is a web3 blockchain project on aptos chain which will provide a platform as well as a buddy which will track your daily tasks and habits. It also make it gamified and fun for the user so that he can publically display their social score(cummulative score based on the activities) and badges they earn and also get the rewards on completing tasks
            </div>
        </div>
        </div>
    </div>
  )
}

export default About