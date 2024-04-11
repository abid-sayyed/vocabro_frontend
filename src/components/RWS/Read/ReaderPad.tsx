import { Paper, Text, ThemeIcon, rem } from '@mantine/core';
import { IconColorSwatch } from '@tabler/icons-react';
import classes from './ReaderPad.module.css';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import PdfReader from '@/components/RWS/Read/pdfReader';
import { ScrollArea } from '@mantine/core';
import { Space } from '@mantine/core';




export function ReaderPad() {
  return (
    <Paper withBorder radius="md" className={classes.card}>
      <ThemeIcon
        size="xl"
        radius="md"
        variant="gradient"
        gradient={{ deg: 0, from: 'pink', to: 'orange' }}
      >
        <IconColorSwatch style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
      </ThemeIcon>
      <Text size="xl" fw={500} mt="md">
       2. Read Mode
      </Text>
      <Text size="md" mt="sm" mb="lg" c="dimmed">
       


      Begin reading your selected book. Read a bit at a time and try to remember the story. 
      Don't worry about memorizing every detail. Just focus on understanding the story. You can write down hints to help you remember for the next step.

        
      </Text>




    <ScrollArea h={595}  type="always" offsetScrollbars scrollHideDelay={6000} classNames={classes}>
    <PdfReader />
    </ScrollArea>


    </Paper>
    
  );
}

export default ReaderPad;