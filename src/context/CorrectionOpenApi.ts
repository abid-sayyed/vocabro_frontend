import React from 'react';
// 1. creating context


interface CorrectionOpenApiContextValue {
    currData: string;
    correctionfetchData: (data: string) => void;
    clearMesg: boolean;
    setClearMesg: (value: boolean) => void;
    editorContent: string;
    setEditorContent: (value: string) => void;
    fetching: boolean;
  }
  
  const CorrectionOpenApiContext = React.createContext<CorrectionOpenApiContextValue | undefined>(undefined);
  
  export default CorrectionOpenApiContext;

