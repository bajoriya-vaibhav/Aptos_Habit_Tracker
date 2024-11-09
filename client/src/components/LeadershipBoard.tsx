import Stars from '../assets/stars.gif'
import Board from '../assets/Leadership.png'
import Trophy from '../assets/trophy.png'

function LeadershipBoard() {
  return (
    <div id="about" className='min-w-screen min-h-screen relative flex flex-col justify-center items-center overflow-hidden'>
        <img src = {Stars} className="w-screen h-screen absolute top-0 left-0 object-cover -z-10"></img>
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

export default LeadershipBoard