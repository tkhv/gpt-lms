import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import PdfViewer from "@/components/MyPDFViewer";
import { DialogContent, DialogClose } from "@/components/ui/dialog";
import ChatArea from "./ChatArea";
import { useState } from "react";

export function LessonsDialog({
  lessonURL,
  lessonName,
  goToNextPdf,
  goToPreviousPdf,
  firstLesson,
  lastLesson,
}: {
  lessonURL: string;
  lessonName: string;
  goToNextPdf: () => void;
  goToPreviousPdf: () => void;
  firstLesson: boolean;
  lastLesson: boolean;
}) {
  const [chatVisible, setChatVisible] = useState(false);
  const toggleChat = () => setChatVisible((prev) => !prev);

  return (
    <DialogContent className="w-auto max-w-[92%] max-h-[98%]">
      <div className="flex items-center justify-start w-100">
        <PdfViewer
          file={lessonURL}
          lessonName={lessonName}
          firstLesson={firstLesson}
          lastLesson={lastLesson}
          goToNextPdf={goToNextPdf}
          goToPreviousPdf={goToPreviousPdf}
          toggleChat={toggleChat}
        />
        {chatVisible && (
          <div
            style={{
              flex: 1,
              width: "40vw",
              paddingRight: "20px",
              paddingTop: "28px",
              height: "90vh",
            }}
          >
            <ChatArea />
          </div>
        )}
      </div>
      <DialogClose asChild></DialogClose>
    </DialogContent>
  );
}
