/** @format */

"use client";

import { useContext, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { useEffect } from "react";

import classes from "./pdfReader.module.css";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import PdfContext from "@/context/PdfContext";
import HelperPadContext from "@/context/HelperPadContext";

import { useDisclosure } from "@mantine/hooks";
import { Popover, Text, Button } from "@mantine/core";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PdfReader({}) {
  const [isMobile, setIsMobile] = useState<boolean>(false); // State to track if it's mobile
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState("");


  const [opened, { close, open }] = useDisclosure(false);


  const { pdf }: { pdf: string } = useContext(PdfContext);

  const { setSelectionText } = useContext(HelperPadContext);
  // Function to handle resizing and update isMobile state
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Assuming 768 as the threshold for mobile devices
  };

  const handleTextSection = async () => {
    const selectedText = window.getSelection()?.toString().trim();
    if (!selectedText) return;

    if (selectedText.length < 40) {
      setSelectionText(selectedText);
    } else if (selectedText.length >= 100) {
      console.log("Selected text is being sent to LLM API", selectedText);
      // Call LLM API function here
    }
  };

  useEffect(() => {
    handleResize(); // Call to initially set isMobile state
    window.addEventListener("resize", handleResize);
    document.addEventListener("mouseup", handleTextSection);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseup", handleTextSection);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className={classes.card}>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => (
            <Page key={page} pageNumber={page} width={isMobile ? 350 : 850} />
          ))}
      </Document>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}

       <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button onMouseEnter={open} onMouseLeave={close}>
          Hover to see popover
        </Button>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }}>
        <Text size="sm">This popover is shown when user hovers the target element</Text>
      </Popover.Dropdown>
    </Popover>
    </div>
  );
}

export default PdfReader;
