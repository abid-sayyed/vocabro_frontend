/** @format */

import { Textarea } from "@mantine/core";
import { Container } from "@mantine/core";
import { Stack, Button } from "@mantine/core";
import HelperPadContext from "@/context/HelperPadContext";
import { useContext, useEffect, useState } from "react";
import { DictionaryResponse } from "@/types/dictionaryTypes";
import { Flex } from "@mantine/core";
import classes from "./HelperPad.module.css";

import { ActionIcon } from "@mantine/core";
import { IconVolume } from "@tabler/icons-react";

function HelperPad() {
  const { selectedText } = useContext(HelperPadContext);
  const [meaning, setMeaning] = useState<DictionaryResponse>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedText || selectedText.trim().includes(" ") || selectedText.length > 30) return;

      if (!selectedText || selectedText.trim().includes(" ")) return;
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`
        );
        if (!response.ok) {
          // console.error("No meaning found");
          return;
        }
        const data = await response.json();
        setMeaning(data);
      } catch (err) {
        // console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [selectedText]);

  const playAudio = () => {
    let audioSrc =
      meaning[0]?.phonetics[0]?.audio || meaning[0]?.phonetics[1]?.audio;

    if (!audioSrc) {
      // Use Google Translate TTS as a fallback
      const word = meaning[0]?.word; // Get word dynamically from your app
      // audioSrc = `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${encodeURI}&tl=en&client=tw-ob `;  //this fallback is not working
    }

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
    } else {
      console.log("No audio available");
    }
  };

  return (
    <>
      {/* <Textarea placeholder="" label="Dictionary Pad" autosize /> */}

      {meaning.length === 0 && <h2 className={classes.heading}>Dictionary</h2>}

      <div className={classes.container}>
        {meaning.length > 0 && (
          <>
            <div className={classes.firstSection}>
              <ActionIcon
                variant="filled"
                size="xl"
                radius="xl"
                aria-label="speaker"
                onClick={playAudio}
              >
                <IconVolume
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>

              <div className={classes.wordSection}>
                <h2>{meaning[0]?.word}</h2>
                <p>{meaning[0]?.phonetic}</p>
              </div>
            </div>

            <div className={classes.secondSection}>
              {meaning[0]?.meanings.map((item, index) => (
                <div key={index} className={classes.speech}>
                  <div className={classes.partOfSpeech}>
                    {item.partOfSpeech}
                  </div>

                  <div className={classes.meaningBox}>
                    <div className={classes.forSpace}></div>

                    <div className={classes.cluster}>
                      {item.definitions.map((def, i) => (
                        <div key={i} className={classes.definition}>
                          <p>{def.definition}</p>

                          {def.example && (
                            <div className={classes.example}>
                              <span className={classes.spanSpace}></span>&quot;
                              {def.example}&quot;
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HelperPad;
