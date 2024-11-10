import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from "./components/About"
import Home from './components/Home';
import Dashboard from './components/User/Dashboard';
import Help from './components/Help';
import Tasks from './components/User/Tasks';
import Collections from './components/User/Collections';
import Leadership from './components/User/Leadership';
import Challenges from './components/User/Challenges';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:walletAddress" element={<Dashboard />} />
        <Route path="/user/:walletAddress/tasks" element={<Tasks />} />
        <Route path="/user/:walletAddress/collections" element={<Collections />} />
        <Route path="/user/:walletAddress/leadership_board" element={<Leadership />} />
        <Route path="/user/:walletAddress/challenges" element={<Challenges />} />
        <Route path="/help" element={<Help/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
