import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useRichTextEditorContext } from '@mantine/tiptap';
import { useState } from 'react';
import { Button } from '@mantine/core';
import { Group } from '@mantine/core';
import { Space } from '@mantine/core';
import { useContext } from 'react';
import CorrectionOpenApi from '@/context/CorrectionOpenApi';
import { useEffect } from 'react';











let content =
  '<h2 style="text-align: center;">Welcome to Write Mode</h2><p>Please write the story you understand in your own words. Don\'t worry even if you make a lot of mistakes now, but in the future, you will surely improve if you continue this exercise</p>';


function WritePad() {



  const { correctionfetchData }  = useContext(CorrectionOpenApi);





  const [clearMessage, setClearMessage] = useState(); // State variable for tracking whether content is cleared

  const [editorContent, setEditorContent] = useState(); // State variable for storing editor content





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
    content,
    onFocus({ editor, event }) {

      // The editor is focused.
      if (!clearMessage) {
        editor.commands.clearContent()
        setClearMessage(true); // Update clearMessage state to true
      }
    },
    onUpdate({ editor }) {
      setEditorContent(editor.view.dom.innerText);
      content =  editorContent
      console.log(editor.view.dom.innerText)
    },
  }

  );


  useEffect(() => {
    // Reset clearMessage state when component unmounts
    return () => {
      setClearMessage(false);
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial mount



  return (
    <>
      <RichTextEditor editor={editor}>
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

      <Space h="md" />
      <Group justify="flex-end">


        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          onClick={() => {
            correctionfetchData(editor.view.dom.innerText)
            
            console.log(editor.view.dom.innerText)
          }}
        >
          Submit
        </Button>
      </Group>


    </>




  );
}

export default WritePad;