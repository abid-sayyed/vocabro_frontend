/** @format */

import React from "react";

const HelperPadContext = React.createContext<{
    selectedText: string;
    setSelectionText: React.Dispatch<React.SetStateAction<string>>;
}>({
    selectedText: "",
    setSelectionText: () => {},
});

export default HelperPadContext;
