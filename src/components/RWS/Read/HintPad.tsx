import { Textarea } from '@mantine/core';

function HintPad() {
  return (
    <>
     <Textarea
        placeholder="Autosize with no rows limit"
        label="Autosize with no rows limit"
        autosize

      />
    </>
  );
}

export default HintPad;

