import React, { useState } from 'react';

// 1. creating context
const PdfContext = React.createContext<{ pdf: string; setPdf: React.Dispatch<React.SetStateAction<string>> }>({
  pdf: "",
  setPdf: () => {},
});

export default PdfContext;
