import React from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FetchData from "./components/fetchData";
import World from "./components/World";
import Weather from "./components/Weather";

const App = () => {
  return (
    <>
    <Router>
    <Navbar />
      <Routes>
        <Route  exact path='/' element={<Home/>}/>
        <Route   path ='/general' element={<FetchData cat="general" />}/>
        <Route   path ='/business' element={<FetchData cat="business" />}/>
        <Route   path ='/health' element={<FetchData cat="health" />}/>
        <Route   path ='/technology' element={<FetchData cat="technology" />}/>
        <Route   path ='/sports' element={<FetchData cat="sports" />}/>
        <Route   path ='/science' element={<FetchData cat="science" />}/>
        <Route   path ='/world' element={<World />}/>
        <Route   path='/weather' element={<Weather/>}/>
      </Routes>
      </Router>
      
    </>
    
  );
}

export default App;
