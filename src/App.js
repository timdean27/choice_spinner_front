import Header from './components/Header'
import Choices from './api_calls/ChoicesAPI'
import SingleChoice from './pages/SingleChoice'

import { Routes, Route } from 'react-router-dom';
import "./app.css";

function App() {
  return (
    <div className="App">

    <Routes>
      <Route path="/" element={<Choices/>}/>
      <Route path="/choice/view/:id" element={<SingleChoice/>}/>
    </Routes>
    </div>
  );
}

export default App;
