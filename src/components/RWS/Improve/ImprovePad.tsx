/** @format */

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import CorrectionOpenApi from "@/context/CorrectionOpenApi";
import { useContext } from "react";
import { useEffect } from "react";

import { LoadingOverlay, Button, Group, Box, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Title } from "@mantine/core";
import { Stack } from "@mantine/core";

function WritePad() {
  const correctionOpenApi = useContext(CorrectionOpenApi);

  // Destructure currData with default value if correctionOpenApi is undefined
  const { currData, fetching }: { currData: string; fetching: boolean } =
    correctionOpenApi || { currData: "", fetching: false };

  // const { currData }  = useContext(CorrectionOpenApi);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  useEffect(() => {
    if (editor && currData) {
      // Format the Gemini-generated text before inserting it into the editor
      const formattedText = formatGeminiText(currData);

      // Convert the formatted text into proper HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(formattedText, "text/html");

      // Clean and insert the formatted content into Tiptap
      const formattedHTML = doc.body.innerHTML.trim();
      editor.commands.setContent(formattedHTML);
    }
  }, [editor, currData]);

  /**
   * Formats the Gemini-generated text to maintain structure (Headings, Corrections, Explanations).
   */
  const formatGeminiText = (text: string): string => {
    return text
      .replace(
        /###\s*Grammar Corrections and Explanations:/g,
        "<h3>Grammar Corrections and Explanations:</h3><br>"
      ) // Heading
      .replace(
        /\*\*Correction\*\*:\s*(.*?)(\n|$)/g,
        "<p><strong>Correction:</strong> $1</p>"
      ) // Format corrections
      .replace(
        /\*\*Explanation\*\*:\s*(.*?)(\n|$)/g,
        "<p><strong>Explanation:</strong> $1</p><br>"
      ) // Add extra <br> after each explanation
      .replace(/\n{2,}/g, "<br>") // Ensure proper spacing
      .trim();
  };

  return (
    <>
      {/* <Box bg="" mb="md"  > */}
      <Stack bg="var(--mantine-color-body)" align="center">
        <Title order={1}>4. Improve Mode</Title>
        <Title order={6}>
          Here is your corrected version Review where you made mistakes and try
          to avoid repeating them in the future. Repeat the exercise for further
          improvement.
        </Title>
      </Stack>
      <Space h="md" />

      <RichTextEditor editor={editor}>
        <LoadingOverlay
          visible={fetching}
          loaderProps={{ children: "Improving..." }}
        />

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
