'use client';

import { useContext, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useEffect } from 'react';



import classes from './pdfReader.module.css';



import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import PdfContext from '@/context/PdfContext';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


function PdfReader({}) {




  const [isMobile, setIsMobile] = useState<boolean>(false); // State to track if it's mobile
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [file , setFile] = useState('');
  
  const { pdf }: { pdf: string } = useContext(PdfContext);








  // Function to handle resizing and update isMobile state
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Assuming 768 as the threshold for mobile devices
  };

  // Effect to add event listener on mount and remove on unmount
  useEffect(() => {
    handleResize(); // Call to initially set isMobile state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures effect runs only once on mount

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }


  return (
  

    <div className={classes.card}>


      
     

      <Document file={pdf}  onLoadSuccess={onDocumentLoadSuccess}   >


        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => (
            
            
            <Page key={page} pageNumber={page} width={isMobile ? 350 : 850} /> 
          ))}

      </Document>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}



    </div>

  );
}

export default PdfReader;