import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from "@/components/ui/button";
import PdfViewer from "@/components/MyPDFViewer";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface myFile {
  url: string;
  name: string;
}

async function getLessons(courseName: string) {
  let res = await fetch("/api/" + courseName + "/listFiles", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch lessons");
  }

  let lessonsList = (await res.json()).filter(
    (file: any) => file.type === "lessons"
  );
  // generate a SAS URL for each file and replace the url with the SAS URL
  for (let i = 0; i < lessonsList.length; i++) {
    const fileName = lessonsList[i].name;
    const sasURL = await getSAS(courseName, fileName);
    lessonsList[i].url = sasURL;
  }
  return lessonsList;
}

async function getSAS(courseName: string, fileName: string) {
  const response = await fetch(
    `/api/${courseName}/getSAS?filename=lessons/${fileName}`
  );

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  const sasURL = (await response.json()).sasURL;
  return sasURL;
}

async function embeddings(courseName: string, file: File) {
  let res = await fetch("/api/" + courseName + "/pdfHandler", {
    method: "POST",
    body: file,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch lessons");
  }

  let lessonsList = await res.json();
  return lessonsList;
}

export default function Lesson() {
  const [isTA, setIsTA] = useState(false);
  const [lessonsList, setLessonsList] = useState([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [currentPdfIndex, setCurrentPdfIndex] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File>();
  const router = useRouter();
  let { courseName } = router.query;
  const { data: session } = useSession();
  /*TODO*/
  //need to be change as File[]
  const [lessonList, setLessonList] = useState<myFile[]>([]);

  useEffect(() => {
    courseName = courseName as string;
    if (session?.user.isAdminFor.includes(courseName)) {
      setIsTA(true);
    }
  });

  useEffect(() => {
    if (typeof courseName === "string") {
      getLessons(courseName)
        .then((lessonsList) => {
          // convert the list of files to a list of myFile[] with name and url
          const files: myFile[] = lessonsList.map((lesson: any) => ({
            name: lesson.name,
            url: lesson.url,
          }));
          setLessonList(files);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [courseName]);

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
      try {
        // first get SAS URL in a GET request to getSAS with the file name as a query param
        const sasURL: string = await getSAS(
          courseName as string,
          selectedFile.name
        );
        const uploadResponse = await fetch(sasURL, {
          method: "PUT",
          body: selectedFile, // This should be your file
          headers: {
            "x-ms-blob-type": "BlockBlob",
          },
        });

        const text = await embeddings(courseName as string, selectedFile);

        console.log(text);

        if (!uploadResponse.ok) {
          throw new Error("File upload failed");
        }

        console.log("File uploaded successfully");

        // Reset selected file after successful upload
        setSelectedFile(undefined);

        // Reset selected file after successful upload
        setSelectedFile(undefined);
      } catch (error) {
        console.error("Upload error:", error);
      }
      // Add to lessonList
      //   setLessonList([...lessonList, selectedFile]);
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
                  <TableRow key={idx}>
                    <TableCell
                      onClick={() => handleLessonClick(idx)}
                      style={{ cursor: "pointer" }}
                    >
                      {lesson.name}
                    </TableCell>
                    <Button onClick={() => handleDelete(idx)} className="ml-4">
                      Delete
                    </Button>
                  </TableRow>
                ))
              : "No files found"}
            {/* {isTA && ( */}
            <div className="flex flex-col w-[30vw]">
              <Input
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                id="fileInput"
              />
              <Button onClick={handleUpload}>Upload PDF</Button>
            </div>
            {/* )} */}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row-reverse relative w-1000">
        <div className=" absolute flex bg-white border-solid border-2 border-blue w-1000">
          <Button onClick={() => setShowPdfViewer((prev) => !prev)}>
            {showPdfViewer ? ">>" : "<<"}
          </Button>
          {showPdfViewer &&
            currentPdfIndex >= 0 &&
            currentPdfIndex < lessonList.length && (
              <div className="flex items-center justify-start w-100">
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
