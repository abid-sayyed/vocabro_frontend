export type Phonetic = {
    text: string;
    audio?: string;
    sourceUrl?: string;
  };
  
  export type Definition = {
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example?: string;
  };
  
  export type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
  };
  
  export type License = {
    name: string;
    url: string;
  };
  
  export type DictionaryEntry = {
    word: string;
    phonetic?: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];
  };
  
  // If the API returns an array of words:
  export type DictionaryResponse = DictionaryEntry[];
  