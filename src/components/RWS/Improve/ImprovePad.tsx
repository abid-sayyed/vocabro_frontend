import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import CorrectionOpenApi from '@/context/CorrectionOpenApi';
import { useContext } from 'react';
import { useEffect } from 'react';

import { LoadingOverlay, Button, Group, Box, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Title } from '@mantine/core';







function WritePad() {



  const correctionOpenApi = useContext(CorrectionOpenApi);

  // Destructure currData with default value if correctionOpenApi is undefined
  const { currData, fetching }: { currData: string, fetching: boolean } = correctionOpenApi || { currData: "", fetching: false };


  // const { currData }  = useContext(CorrectionOpenApi);


  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',


  });


  useEffect(() => {
    if (editor) {
      editor.commands.setContent(currData);
    }
  }, [editor, currData]);



  return (
    <>

    <Box bg="" mb="md" >
          <Title order={1}>4. Improve Mode</Title>
          <Space h="md" />
          <Title order={6}>Here is your corrected version Review where you made mistakes and try to avoid repeating them in the future. Repeat the exercise for further improvement.</Title>

    </Box>


    <RichTextEditor editor={editor}>
      

    <LoadingOverlay visible={fetching} loaderProps={{ children: 'Improving...' }} />

      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>

    </>
  );
}

export default WritePad;