/** @format */

"use client";

import React, { useState } from "react";
import HelperPadContext from "./HelperPadContext";

const HelperPadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedText, setSelectionText] = useState("");

  return (
    <HelperPadContext.Provider value={{ selectedText, setSelectionText }}>
      {children}
    </HelperPadContext.Provider>
  );
};

export default HelperPadProvider;
