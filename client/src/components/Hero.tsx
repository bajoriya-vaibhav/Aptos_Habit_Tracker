import Stars from '../assets/hero2.gif'
import Navbar from './Navbar'
import Start from '../assets/start.png'

function Hero() {
  return (
    <div className="min-w-screen min-h-screen relative flex flex-col justify-between items-center overflow-hidden">
        <img src = {Stars} className="w-screen h-screen object-fill absolute top-0 left-0 -z-10"></img>
        <div className="w-full z-50">
          <Navbar />
        </div>
        <div className='ml-[7%] text-7xl mb-[15%] font-extrabold text-white'>
            Welcome to Habitise
        </div>
        <img src={Start} className='w-1/6 h-1/6'></img>
        
    </div>
  )
}

export default Hero