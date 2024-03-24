
'use client';

import UploadYours from "@/components/RWS/UploadYours";
import BookSelection from "@/components/RWS/BookSelection";
import ImageCheckboxes from "@/components/RWS/ContinueBox";

import { Divider, Box, Anchor } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';


export default function Home() {
    return (

        <>
        < ImageCheckboxes />
            <UploadYours />

            <Divider
                pt="xl"
                my="xs"
                variant="dashed"
                labelPosition="center"
                p-10
                label={
                    <>
                        <IconSearch size={12} />
                        <Box ml={5}>Select Book</Box>
                    </>
                }
            />



            <BookSelection />
        </>
    );
}

