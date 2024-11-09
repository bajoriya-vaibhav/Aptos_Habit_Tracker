import Stars from '../assets/stars.gif'
import Square from '../assets/sqaureframe.png'
import Nfts from '../assets/nfts.png'

function NFTS() {
  return (
    <div className='min-w-screen min-h-screen relative flex flex-col justify-center items-center overflow-hidden'>
        <img src = {Stars} className="w-screen min-h-screen absolute top-0 left-0 object-cover -z-10"></img>
        <div className="z-50 text-xl ">
            <div className='py-4'>
            <div className="-rotate-2 m-auto relative w-[500px] h-[110px] flex items-center justify-center bg-cover bg-center text-6xl font-extrabold text-center" style={{ backgroundImage: `url(${Square})` }}>
                Collect NFTs
            </div>
            <div className='-rotate-2 text-pink text-6xl font-extrabold text-center mb-4'>Showcase Your Collectibles</div>
            <img src={Nfts}/>
        </div>
        </div>
    </div>
  )
}

export default NFTS