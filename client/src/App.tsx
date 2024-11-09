import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from "./components/About"
import Home from './components/Home';
import Dashboard from './components/User/Dashboard';
// import { Aptos } from "@aptos-labs/ts-sdk";

function App() {
  // const aptos = new Aptos();
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} 
        />
        <Route path="/about" element={<About />} />
        <Route path="/user/:walletAddress" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
