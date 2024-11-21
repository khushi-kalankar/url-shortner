import { useState } from "react";
import "./App.css";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RedirectHandler from "./components/RedirectHandler";
import Analytics from "../pages/Analytics";


function App() {
  

  return (
    <>
      <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/:shortId" element={<RedirectHandler/>} />
            <Route path="/analytics/:shortId" element= {<Analytics/>}/>
          </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
