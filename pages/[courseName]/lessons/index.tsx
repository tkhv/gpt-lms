import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserTypeContext } from "@/context/userTypeContext";
import PdfViewer from "@/components/MyPDFViewer";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Input } from "@/components/ui/input";

interface myFile {
  url: string;
  name: string;
}

export default function Lesson() {
  const pdfFile = "path_to_your_pdf_file.pdf";
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  /*TODO*/
  //need to be change as File[]
  const [lessonList, setLessonList] = useState<myFile[]>([
    { url: `/lesson_1.pdf`, name: "lesson_1" },
    { url: `/lesson_2.pdf`, name: "lesson_2" },
    { url: `/lesson_1.pdf`, name: "lesson_3" },
    { url: `/lesson_2.pdf`, name: "lesson_4" },
  ]);
  const [currentPdfIndex, setCurrentPdfIndex] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedLessonName, setSelectedLessonName] = useState<string>("");
  const router = useRouter();
  const { courseName } = router.query;

  const { isTA, setIsTA } = useUserTypeContext();

  const goToPreviousPdf = () => {
    if (currentPdfIndex > 0) {
      setCurrentPdfIndex(currentPdfIndex - 1);
    }
  };

  const goToNextPdf = () => {
    if (currentPdfIndex < lessonList.length - 1) {
      setCurrentPdfIndex(currentPdfIndex + 1);
    }
  };

  const handleLessonClick = (idx: number) => {
    setCurrentPdfIndex(idx);
    setShowPdfViewer(true);
  };

  const handleDelete = (index: number) => {
    // Update lesson list to remove the selected lesson
    const updatedLessons = lessonList.filter((_, idx) => idx !== index);
    setLessonList(updatedLessons);

    // If the current PDF is deleted, hide the viewer or show the previous/next one
    if (currentPdfIndex === index) {
      setCurrentPdfIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      setShowPdfViewer(updatedLessons.length > 0);
    }

    // delete the lesson from the container using api
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
    } else {
      // Handle the case where no file was selected
      setSelectedFile(undefined);
    }
  };

  /*TODO*/
  const handleUpload = async () => {
    if (selectedFile) {
      // Add to lessonList
      //   setLessonList([...lessonList, selectedFile]);

      // Upload to server
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // Replace with your API endpoint
        // const response = await fetch("/api/upload", {
        //   method: "POST",
        //   body: formData,
        // });

        // if (!response.ok) {
        //   throw new Error("File upload failed");
        // }

        // Reset selected file after successful upload
        setSelectedFile(undefined);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 pl-8 pt-8 pb-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {courseName} Lessons
            </h2>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Lessons</TableHead>
              {/* <TableHead className="text-right"></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessonList
              ? lessonList.map((lesson, idx) => (
                  <TableRow key={lesson.name}>
                    <TableCell>
                      <Button onClick={() => handleLessonClick(idx)}>
                        {lesson.name}
                      </Button>
                      {isTA && (
                        <Button
                          onClick={() => handleDelete(idx)}
                          className="ml-4"
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : "No files found"}
            {isTA && (
              <div className="flex flex-col w-[30vw]">
                <Input
                  value={selectedLessonName}
                  onChange={(e) => setSelectedLessonName(e.target.value)}
                  placeholder="Type the Lesson name"
                />
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  id="fileInput"
                />
                <Button onClick={handleUpload}>Upload PDF</Button>
              </div>
            )}
          </TableBody>
        </Table>
        <Button
          className="flex justify-items-end w-20"
          onClick={() => setIsTA(!isTA)}
        >
          {isTA ? "TA" : "Student"}
        </Button>
      </div>
      <div className="flex flex-row-reverse relative">
        <div className=" absolute flex bg-white border-solid border-2 border-blue">
          <Button onClick={() => setShowPdfViewer((prev) => !prev)}>
            {showPdfViewer ? ">>" : "<<"}
          </Button>
          {showPdfViewer &&
            currentPdfIndex >= 0 &&
            currentPdfIndex < lessonList.length && (
              <div className="flex items-center justify-start">
                <Button
                  onClick={goToPreviousPdf}
                  disabled={currentPdfIndex <= 0}
                >
                  {"<"}
                </Button>

                <PdfViewer
                  file={lessonList[currentPdfIndex].url}
                  lessonName={lessonList[currentPdfIndex].name}
                  /*TODO*/
                  /* when lessonList replace with File[] */
                  //   file={${lessonList[currentPdfIndex]}}
                  //   lessonName={lessonList[currentPdfIndex].name}
                />
                <Button
                  onClick={goToNextPdf}
                  disabled={currentPdfIndex >= lessonList.length - 1}
                >
                  {">"}
                </Button>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
