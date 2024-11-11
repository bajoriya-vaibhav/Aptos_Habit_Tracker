import { Link } from 'react-router-dom'
import Crypto from '../../assets/crypto.png'

function Collections() {
  return (
    <div className="bg-dark text-white overflow-hidden min-w-screen min-h-screen relative">
      <Link to='./..' className="absolute top-6 left-10 text-4xl">&lt;</Link>
      <div className="mt-20 flex flex-col items-center justify-start min-h-screen gap-6">
        <div className='text-5xl text-left'>Your Collection</div>
        <img src={Crypto} alt="Crypto" className="w-1/3" />
        <div className=' m-10'>No collectibles yet</div>
      </div>
    </div>
  )
}

export default Collections