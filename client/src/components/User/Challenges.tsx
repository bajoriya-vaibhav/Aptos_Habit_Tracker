import { Link } from "react-router-dom"

function Challenges() {
  return (
    <div className="bg-dark text-white overflow-hidden min-w-screen min-h-screen relative">
      <Link to='./..' className="absolute top-6 left-10 text-4xl">&lt;</Link>
      <div className="mt-20 flex flex-col items-center justify-start min-h-screen gap-6">
        <div className='text-5xl text-left'>Coming Soon</div>
      </div>
    </div>
  )
}

export default Challenges