import Stars from '../assets/stars.gif'
import Square from '../assets/sqaureframe.png'
function Invitation() {
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
                Join Us and Make You Habit Tracking a Fun and Gamified. Get Comfortable and Fastened Your Seatbelt for the Journey to Habitise. <br /> Join Us 
            </div>
            
        </div>
        </div>
    </div>
  )
}

export default Invitation