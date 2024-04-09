'use client';
import React, { useState } from 'react';
import PdfContext from "./PdfContext";
// 2. awarness boilerplate



const PdfContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [pdf, setPdf] = useState("/book/review.pdf");

  return (
    <PdfContext.Provider value={{ pdf, setPdf }}>
      {children}
    </PdfContext.Provider>
  );
}

export default PdfContextProvider;