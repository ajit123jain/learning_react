import covidPdf from './Covid.pdf';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js`;

export default function PoplifyPdf() {
  return (
    <Document file={covidPdf}>
      <Page pageNumber={1} />
    </Document>
  );
}


