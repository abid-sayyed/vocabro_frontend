// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';


//3. awarness
import PdfContextProvider from '@/context/PdfContextProvider';
import CorrectionOpenApiProvider from '@/context/CorrectionOpenApiProvider';
import AuthenticationContextProvider from '@/context/AuthenticationProvider';

//componets
import ShellLayout from '@/components/shellLayout/ShellLayout';


//libraries
import { pdfjs } from 'react-pdf';


export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// Set up PDF.js worker configuration
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <AuthenticationContextProvider>
          <MantineProvider defaultColorScheme="dark">
          <ModalsProvider>

            <PdfContextProvider>
              <CorrectionOpenApiProvider>

                <ShellLayout>
                  
                  {children}
                </ShellLayout>

              </CorrectionOpenApiProvider>
            </PdfContextProvider>
            </ModalsProvider>

          </MantineProvider>
        </AuthenticationContextProvider>

      </body>
    </html>
  );

}