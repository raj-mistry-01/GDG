import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Index from './components/Index';
import Yield_form from './components/Yield_form';
import ChatPanel from './components/ChatPanel';
import ChatBot from './components/ChatBot';
import Navbar from './components/Navbar';
import Expr from './components/Expr';
import Cnn from './components/Cnn';
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path='/yield_form' element={<Yield_form/>}></Route>
        <Route path='/chatbot' element={<ChatPanel/>}></Route>
        <Route path='/chatbot1' element={<ChatBot/>}></Route>
        <Route path='/testing' element={<Expr/>}></Route>
        <Route path='/cnn' element={<Cnn/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
