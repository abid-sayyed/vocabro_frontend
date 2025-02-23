/** @format */

"use client";

import React, { useState } from "react";
import HelperPadContext from "./HelperPadContext";
import { useCallback } from "react";

const HelperPadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedText, setSelectionText] = useState("");

  const handleTextSection = useCallback(async () => {
    const selectedText = window.getSelection()?.toString().trim();
    if (!selectedText) return;
    setSelectionText(selectedText);
  }, [setSelectionText]); 

  return (
    <HelperPadContext.Provider value={{ selectedText, setSelectionText, handleTextSection }}>
      {children}
    </HelperPadContext.Provider>
  );
};

export default HelperPadProvider;
