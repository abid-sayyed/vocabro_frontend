'use client';
import React, { useState } from 'react';
import CorrectionOpenApiContext from "./CorrectionOpenApi";

// 2. awarness boilerplate




export const CorrectionOpenApiProvider = ({ children }) => {
  const [currData, setCurrData] = useState(""); // store three thing, write data, improved data and function to fetch data

  const correctionfetchData = (data) =>{
   
    setCurrData(data);
  };



  return (
    <CorrectionOpenApiContext.Provider value={{ currData, correctionfetchData }}>
      {children}
    </CorrectionOpenApiContext.Provider>
  );
};


export default CorrectionOpenApiProvider;