import Trophy from '../../assets/trophy.png'
import Board from '../../assets/Leadership.png'
import { Link } from 'react-router-dom'

function Leadership() {
  return (
    <div className="bg-dark text-white min-w-screen min-h-screen relative flex flex-col justify-center items-center overflow-hidden">
      <Link to='./..' className="absolute top-6 left-10 text-4xl">&lt;</Link>
      <div className="z-50 text-xl my-16">
          <div className='py-6 space-y-8'>
              <div className='text-pink text-6xl font-extrabold text-center'>Leadership Board </div>
              <img src={Trophy} className='mx-auto h-28 '></img>
              <img src={Board} className=''></img>
          </div>
      </div>
    </div>
  )
}

export default Leadership