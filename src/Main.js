import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MaterialDetails from './Materials/MaterialDetails';
import MaterialList from './Materials/MaterialList';
import Navbar from './Navbar/Navbar';
import Details from './Details';


const Main = () => {
  return (
   
    
      <div className="Main">
        
        <Navbar />
        
        <Routes>
          <Route path="/materialDetails" element={<MaterialDetails />} />
          <Route path="/materialList" element={<MaterialList />} />
          
        </Routes>
       <Details />
      </div>
      
    
  );
};

export default Main;
