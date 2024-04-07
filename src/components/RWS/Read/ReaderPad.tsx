import { Paper, Text, ThemeIcon, rem } from '@mantine/core';
import { IconColorSwatch } from '@tabler/icons-react';
import classes from './ReaderPad.module.css';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import PdfReader from '@/components/RWS/Read/pdfReader';
import { ScrollArea } from '@mantine/core';




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
        Theming documentation
      </Text>
      <Text size="sm" mt="sm" c="dimmed">
       


        Extend default theme with any amount of additional colors, replace shadows, radius, spacing,
        fonts and many other properties to match your design requirements. Mantine theme is just an
        object, you can subscribe to it in any part of application via context and use it to build
        your own components.

        
      </Text>




    <ScrollArea h={595}  type="always" offsetScrollbars scrollHideDelay={6000} classNames={classes}>
    <PdfReader />
    </ScrollArea>


    </Paper>
    
  );
}

export default ReaderPad;