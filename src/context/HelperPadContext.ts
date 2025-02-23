/** @format */

import React from "react";

const HelperPadContext = React.createContext<{
    selectedText: string;
    setSelectionText: React.Dispatch<React.SetStateAction<string>>;
    handleTextSection: () => void;
}>({
    selectedText: "",
    setSelectionText: () => {},
    handleTextSection: () => {},
});

export default HelperPadContext;
