import { useRef } from 'react';
import { useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './UploadYours.module.css';

import { Container, Paper, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import BookSelection from './BookSelection';



export function UploadYours({ onClick }) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  //for submitting data:

  const form = useForm({
    initialValues: {
      title: '',
    },

    validate: {

    },
  });



  
  //sending to flask server as a post request
  const handleSubmit = async (values) => {

    
    // Create a new FormData object
    const requestData = {
      fileName: 'pdf',
      title: values.title
    };
    
    try {
      console.log(requestData);

      // Send a POST request to the Flask server
      const response = await fetch('http://127.0.0.1:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log(data); // Log the response data

      //sending callback function to other component
    
    
    


    } catch (error) {
      console.error(error);
    }
  }

  return (

    <Container size={420} my={40}>

      <form onSubmit={form.onSubmit(handleSubmit)}>


        <Paper withBorder shadow="md" p={30} mt={30} radius="md">

          <div className={classes.wrapper}>
            <Dropzone
              openRef={openRef}
              onDrop={() => { }}
              className={classes.dropzone}
              radius="md"
              accept={[MIME_TYPES.pdf]}
              maxSize={30 * 1024 ** 2}
            >
              <div style={{ pointerEvents: 'none' }}>
                <Group justify="center">
                  <Dropzone.Accept>
                    <IconDownload
                      style={{ width: rem(50), height: rem(50) }}
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{ width: rem(50), height: rem(50) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                  </Dropzone.Idle>
                </Group>

                <Text ta="center" fw={700} fz="lg" mt="xl">
                  <Dropzone.Accept>Drop files here</Dropzone.Accept>
                  <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                  <Dropzone.Idle>Upload resume</Dropzone.Idle>
                </Text>
                <Text ta="center" fz="sm" mt="xs" c="dimmed">
                  Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
                  are less than 30mb in size.
                </Text>
              </div>
            </Dropzone>

            <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
              Select files
            </Button>
          </div>


          
          <TextInput label="Title"
            placeholder="you@mantine.dev" required
            {...form.getInputProps('title')}

          />

          
          <Button type='submit' fullWidth mt="xl">
            Upload
          </Button>



        </Paper>

      </form>


    </Container>
  );
}

export default UploadYours;

