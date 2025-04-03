import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Index from "./components/Index"
import Yield_form from "./components/Yield_form"
import ChatPanel from "./components/ChatPanel"
import Navbar from "./components/Navbar"
import Expr from "./components/Expr"
import Cnn from "./components/Cnn"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/yield_form" element={<Yield_form />}></Route>
          <Route path="/chatbot" element={<ChatPanel />}></Route>
          <Route path="/testing" element={<Expr />}></Route>
          <Route path="/cnn" element={<Cnn />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;