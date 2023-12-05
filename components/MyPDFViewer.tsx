import React, { useCallback, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "./ui/button";

// Set worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/* when lessonList replace with File[] 
the prop should be just file which is File type
and replace lessonName with file.name. that's all
*/

interface PdfViewerProps {
  file: string;
  lessonName: string;
  firstLesson: boolean;
  lastLesson: boolean;
  goToNextPdf: () => void;
  goToPreviousPdf: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  file,
  lessonName,
  firstLesson,
  lastLesson,
  goToNextPdf,
  goToPreviousPdf,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const [scale, setScale] = useState(1.0); // PDF scale
  const viewerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const zoomIn = () => setScale(scale * 1.2);
  const zoomOut = () => setScale(scale / 1.2);

  const scrollToPage = (currentPage: number) => {
    const pageElement = document.querySelector(
      `.react-pdf__Page[data-page-number="${currentPage}"]`
    ) as HTMLElement | null; // Add `null` because the querySelector can return null if the element is not found.

    if (viewerRef.current && pageElement) {
      viewerRef.current.scrollTop = pageElement.offsetTop;
    }
  };

  // Handle automatic scrolling
  const handleScroll = useCallback(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      const scrolledcurrentPage =
        Math.round((viewer.scrollTop / viewer.scrollHeight) * numPages) + 1;
      setCurrentPage(scrolledcurrentPage);
    }
  }, [numPages]);

  return (
    <div className="flex flex-col items-center h-[100vh] w-[50vw] justify-around">
      {/* Navigation and Zoom Controls */}
      <div className="flex justify-between items-center space-x-2">
        <Button
          onClick={goToPreviousPdf}
          disabled={firstLesson}
          className="max-h-6"
        >
          {"<"}
        </Button>
        <h2 className="flex-grow text-center">{lessonName}</h2>
        <Button onClick={goToNextPdf} disabled={lastLesson} className="max-h-6">
          {">"}
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={zoomIn}
            className="bg-blue-300 hover:bg-blue-400 text-blue-800 max-h-5"
          >
            +
          </Button>
          <Button
            onClick={zoomOut}
            className="bg-blue-300 hover:bg-blue-400 text-blue-800 max-h-5"
          >
            -
          </Button>
          <Button
            onClick={() => scrollToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="max-h-5"
          >
            Prev
          </Button>
          <span className="text-lg">
            {currentPage} of {numPages}
          </span>
          <Button
            onClick={() => scrollToPage(currentPage + 1)}
            disabled={currentPage >= numPages}
            className="max-h-5"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Scrollable PDF Document */}
      <div
        ref={viewerRef}
        onScroll={handleScroll}
        className="overflow-auto border-2 border-gray-200 h-full w-full"
        // style={{ position: "relative" }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center w-max"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
