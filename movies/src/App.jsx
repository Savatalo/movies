import './App.css'
import Home from './pagess/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pagess/About'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/:id" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App
