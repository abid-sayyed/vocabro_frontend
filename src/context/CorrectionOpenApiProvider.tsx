'use client';
import React, { useState } from 'react';
import CorrectionOpenApiContext from '@/context/CorrectionOpenApi';
import { ReactNode } from 'react';
import Anthropic from "@anthropic-ai/sdk";




const CorrectionOpenApiProvider = ({ children }: { children: ReactNode }) => {
  const [currData, setCurrData] = useState(""); // store three thing, write data, improved data and function to fetch data
  const [clearMesg, setClearMesg] = useState(false); // store three thing, write data, improved data and function to fetch data

  let mesgForuser =
    '<h2 style="text-align: center;">3. Welcome to Write Mode</h2><p>Please write the story you understand in your own words. You can take help from the hint pad for writing. Don\'t worry even if you make a lot of mistakes now, but in the future, you will surely improve if you continue this exercise</p>';

  const [editorContent, setEditorContent] = useState<string>(mesgForuser); // State variable for storing editor content

  const [fetching, setFetching] = useState(false); // store three thing, write data, improved data and function to fetch data


  const correctionfetchData = async (sendData: string) => {

    try {
      setFetching(true);
  
      const domain = window?.location?.origin || '';
      const anthropic = new Anthropic({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        baseURL: domain + '/anthropic/'
      });

      const msg = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        temperature: 0,
        system: "You are Claude, an AI writing assistant. When provided with an English paragraph, you will carefully review it and identify any grammatical errors, typos, or other issues. You will then provide the paragraph back to the user with all corrections made, without any additional commentary or instructions. Your sole focus is to return the paragraph in its corrected form, allowing the user to easily see and implement the necessary changes. Please respond concisely with only the revised paragraph.",
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": editorContent
              }
            ]
          }
        ]
      });
      setCurrData(msg.content[0].text);

      setFetching(false);

    } catch (error) {
      console.error("Error fetching data from Anthropic:", error);
      throw error;
    }
  };


  return (
    <CorrectionOpenApiContext.Provider value={{ currData, correctionfetchData, clearMesg, setClearMesg, editorContent, setEditorContent, fetching}}>
      {children}
    </CorrectionOpenApiContext.Provider>
  );
};

export default CorrectionOpenApiProvider;
