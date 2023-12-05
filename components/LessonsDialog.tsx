import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import PdfViewer from "@/components/MyPDFViewer";
import {
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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
  return (
    <DialogContent className="max-w-[60%] max-h-[98%]">
      <div className="flex items-center justify-start w-100">
        <PdfViewer
          file={lessonURL}
          lessonName={lessonName}
          firstLesson={firstLesson}
          lastLesson={lastLesson}
          goToNextPdf={goToNextPdf}
          goToPreviousPdf={goToPreviousPdf}
          /*TODO*/
          /* when lessonList replace with File[] */
          //   file={${lessonList[currentPdfIndex]}}
          //   lessonName={lessonList[currentPdfIndex].name}
        />
      </div>
      <DialogClose asChild>
        <DialogFooter>footer</DialogFooter>
      </DialogClose>
    </DialogContent>
  );
}
