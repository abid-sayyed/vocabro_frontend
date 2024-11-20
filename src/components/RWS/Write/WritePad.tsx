'use client';
import { RichTextEditor, Link as MantineLink } from '@mantine/tiptap';
import { EditorContent, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

import { Button } from '@mantine/core';
import { Group } from '@mantine/core';
import { Space } from '@mantine/core';
import { useContext, useEffect } from 'react';
import CorrectionOpenApi from '@/context/CorrectionOpenApi';


import Link from 'next/link';






function WritePad() {

  const correctionOpenApi = useContext(CorrectionOpenApi);

  const {
    correctionfetchData,
    clearMesg,
    setClearMesg,
    editorContent,
    setEditorContent,

  } = correctionOpenApi || { correctionfetchData: () => { }, clearMesg: false, setClearMesg: () => { }, editorContent: '', setEditorContent: () => { } };



  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      MantineLink,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: editorContent,
    onFocus({ editor, event }) {

      // The editor is focused.
      if (!clearMesg) {
        editor.commands.clearContent()
        setEditorContent("")

        setClearMesg(true); // Update clearMessage state to true
      }
    },

    onUpdate({ editor }) {
      setEditorContent(editor.view.dom.innerText)
      // The editor content was updated.
    },


  }

  );

  const linkProps = { href: '/RWS/ImproveMode', rel: 'noopener noreferrer' };




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

        <Link {...linkProps} >
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={() => {
              correctionfetchData(editorContent)
            }}

          >
            Submit
          </Button>
        </Link>

      </Group>


    </>




  );
}

export default WritePad;