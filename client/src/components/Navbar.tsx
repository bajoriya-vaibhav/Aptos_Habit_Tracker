import Logo from '../assets/logo.png'

function Navbar() {
  return (
    <div className="flex justify-between z-50 mx-10">
        <img src={Logo} className='m-4 h-28 w-32'></img>
        <div className='flex flex-center m-10 text-4xl text-white gap-10'>
            <div className=''>About</div>
            <div className=''>Connect</div>
        </div>
    </div>
  )
}

export default Navbar