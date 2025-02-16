/** @format */

"use client";
import React, { useState } from "react";
import CorrectionOpenApiContext from "@/context/CorrectionOpenApi";
import { ReactNode } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

let mesgForuser =
  '<h2 style="text-align: center;">3. Welcome to Write Mode</h2><p>Please write the story you understand in your own words. You can take help from the hint pad for writing. Don\'t worry even if you make a lot of mistakes now, but in the future, you will surely improve if you continue this exercise</p>';



const CorrectionOpenApiProvider = ({ children }: { children: ReactNode }) => {
  const [currData, setCurrData] = useState(""); // store three thing, write data, improved data and function to fetch data
  const [clearMesg, setClearMesg] = useState(false); // store three thing, write data, improved data and function to fetch data
  const [editorContent, setEditorContent] = useState<string>(mesgForuser); // State variable for storing editor content
  const [fetching, setFetching] = useState(false); // store three thing, write data, improved data and function to fetch data

  const prompt = `You are an AI writing assistant. When provided with an English paragraph, you will carefully review it and identify any       grammatical errors, typos, or other issues. You will then provide the corrected paragraph to the user without any additional commentary or instructions.Below the corrected paragraph, you will list all the corrections made along with the mistakes found, using a structured format with colors for better readability.
  The format should be:  
  
  ### Grammar Corrections and Explanations:  
    1. **[Incorrect sentence]**  
    **Correction**: "[Corrected sentence]"  
    **Explanation**: "[Explanation of why this change was made.]"  

    2. **[Another incorrect sentence]**  
    **Correction**: "[Corrected sentence]"  
    **Explanation**: "[Explanation of why this change was made.]"  

  `;

  const correctionfetchData = async (sendData: string) => {
    try {
      setFetching(true);

      const geminiApiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";

      if (!geminiApiKey) {
        window.alert("Some technical error occurred from Gemini API.");
      }

      const genAI = new GoogleGenerativeAI(geminiApiKey);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: prompt, });
      const result = await model.generateContent(editorContent);
      setCurrData(result.response.text());

      setFetching(false);
    } catch (error) {
      window.alert("Some technical error occurred from Gemini API.")
    }
  };

  return (
    <CorrectionOpenApiContext.Provider
      value={{
        currData,
        correctionfetchData,
        clearMesg,
        setClearMesg,
        editorContent,
        setEditorContent,
        fetching,
      }}
    >
      {children}
    </CorrectionOpenApiContext.Provider>
  );
};

export default CorrectionOpenApiProvider;
