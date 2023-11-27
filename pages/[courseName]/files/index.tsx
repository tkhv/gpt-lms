import type { GetStaticProps, GetStaticPaths } from "next";
import { useEffect, useState } from "react";
type File = {
  type: "quiz" | "assignment" | "lesson";
  name: string;
  url: string;
};
type FilesList = File[];

type CourseProps = {
  courseName: string;
};

async function getFilesList(courseName: string) {
  let res = await fetch(
    "http://localhost:3000/api/" + courseName + "/listFiles",
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export default function Files({ courseName }: CourseProps) {
  const [filesList, setFilesList] = useState<FilesList>([]);

  useEffect(() => {
    getFilesList(courseName)
      .then((files) => {
        console.log(files);
        setFilesList(files);
      })
      .catch((err) => console.error(err));
  }, [courseName]);

  return (
    <div>
      <p>FILES: {courseName}</p>
      {filesList.length ? (
        filesList.map((file, index) => (
          <div key={index}>
            <p>{file.name}</p>
          </div>
        ))
      ) : (
        <p>NO FILES</p>
      )}
    </div>
  );
}

/* This function gets called at build time to define
the possible options for the dynamic route. We fetch 
the courseList for the logged in user and pre-render 
those. */
export const getStaticPaths: GetStaticPaths = (async () => {
  // Call our API to get courseList for this user.
  // This is dummy data
  const courseList = [
    { name: "cs2200" },
    { name: "cs3312" },
    { name: "cs4400" },
  ];

  const paths = courseList.map((course) => ({
    params: { courseName: course.name },
  }));

  // { fallback: false } means other routes should 404.
  return {
    paths: paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

// pre-render this page at build time
export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params,
}) => {
  if (!params || typeof params.courseName !== "string") {
    return {
      notFound: true,
    };
  }

  const courseName = params.courseName;
  return { props: { courseName } };
};
