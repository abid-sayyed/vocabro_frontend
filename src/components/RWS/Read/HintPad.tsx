import { Textarea } from '@mantine/core';
import React, { useState, useEffect } from 'react';

function HintPad() {
  const [value, setValue] = useState('');

  // Load saved text from localStorage on component mount
  useEffect(() => {
    const savedText = localStorage.getItem('hintPadText');
    if (savedText) {
      setValue(savedText);
    }
  }, []);

  // Save text to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hintPadText', value);
  }, [value]);

  return (
    <>
      <Textarea
        placeholder="Autosize with no rows limit"
        label="Autosize with no rows limit"
        autosize
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </>
  );
}

export default HintPad;
