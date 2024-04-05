'use client';

//react
import React, { createContext, useState } from 'react';

//mantine
import { Divider, Box } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Group } from '@mantine/core';

//components
import UploadYours from "@/components/RWS/UploadYours";
import BookSelection from "@/components/RWS/BookSelection";
import ImageCheckboxes from "@/components/RWS/ContinueBox";




//for auto refreshing the book list after uploading and deleting a book
export const StateContext = createContext<{
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
  }>({
    state: false,
    setState: () => {}
  });

  
export default function Home() {

    const [state, setState] = useState<boolean>(false);


    return (
    <StateContext.Provider value={{ state, setState }}>
            <>
                <ImageCheckboxes />
                <Group>
                    <UploadYours />
                </Group>
                <Divider
                    pt="xl"
                    my="xs"
                    variant="dashed"
                    labelPosition="center"
                    p={10} // Changed p-10 to p={10}
                    label={
                        <>
                            <IconSearch size={12} />
                            <Box ml={5}>Select Book</Box>
                        </>
                    }
                />
                <BookSelection />
            </>
        </StateContext.Provider>
    );
}
