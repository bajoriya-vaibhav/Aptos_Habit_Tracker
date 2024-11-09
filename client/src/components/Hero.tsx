import Stars from '../assets/hero2.gif'
import Navbar from './Navbar'
import Start from '../assets/start.png'
import Arrow from '../assets/arrow.png'

function Hero() {
  return (
    <div className="min-w-screen min-h-screen relative overflow-hidden">
        <img src = {Stars} className="w-screen h-screen object-fill absolute top-0 left-0 -z-10"></img>
        <div className="w-full z-50">
          <Navbar />
        </div>
        <div className='mx-[15%] mt-20 text-center text-7xl font-extrabold text-white'>
            Welcome to Habitise
        </div>
        <img src={Start} className='m-auto w-1/6 h-1/6'></img>
        <img src={Arrow} className='absolute bottom-12 inset-x-1/2 m-auto h-20' />
    </div>
  )
}

export default Hero