import PdfReader from '@/components/RWS/Read/pdfReader';
import {Stack} from '@mantine/core';
import React from 'react';
import { ScrollArea } from '@mantine/core';



function Forums() {
    return (
        

        <Stack

      bg="var(--mantine-color-body)"
      align="flex-start"
      justify="flex-start"
        
        
        >
            <h1> hello</h1>


            <ScrollArea h={595}  type="always" offsetScrollbars scrollHideDelay={6000} >
    <PdfReader />
    </ScrollArea>

        </Stack>
    )
}

export default Forums;