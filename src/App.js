import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';
import "./app.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} /> {/* Specify the 'element' prop */}
      </Routes>
    </div>
  );
}

export default App;

