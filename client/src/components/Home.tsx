import Hero from "../components/Hero"
import Invitation from "../components/Invitation"
import NFTS from "../components/NFTS"
import Contact from "./Contact"
import LeadershipBoard from "./LeadershipBoard"
function Home() {

  return (
    <>
          <Hero />
          <Invitation />
          <NFTS />
          <LeadershipBoard />
          <Contact />
        </>
  )
}

export default Home