//react
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';


//mantine
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './UploadYours.module.css';
import { Container, Paper, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createContext } from 'react';


//components
import { StateContext } from '@/app/RWS/page';



export function UploadYours() {

  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const { state, setState } = useContext(StateContext);  //share state betweeen upload and bookselection list
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);



  //form validation
  const form = useForm({
    initialValues: {
      title: '',
    },

    validate: {

    },
  });


  const handleDrop = (files: File[]) => {
    setDroppedFiles(files); // Store the dropped files in state
  };



  //sending to flask server as a post request
  const handleSubmit = async (values: { title: string }) => {

    if (!droppedFiles.length) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData(); 
    formData.append('file', droppedFiles[0]); // Append the file to the FormData object

    const requestData = {
      // fileName: 'pdf',
      title: values.title
    };

    formData.append('requestData', JSON.stringify(requestData)); // Append the requestData to the FormData object


    try {
      console.log(formData);
      const response = await fetch('http://127.0.0.1:5000/books', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to upload file');

      }


      setDroppedFiles([]); // Clear the dropped files
      form.reset(); // Clear the form
      setState(true); // on uplaod refresh the book list

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
                onDrop={handleDrop}
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
                  <Dropzone.Idle>Upload book</Dropzone.Idle>
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

