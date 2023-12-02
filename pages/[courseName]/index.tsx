import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

// Download the blob content
async function getReadme(courseName: string) {
  try {
    const response = await fetch(
      `/api/` + courseName + `/getReadme?courseName=${courseName}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.content;
    } else {
      throw new Error("Failed to fetch blob content");
    }
  } catch (error) {
    throw new Error("Error fetching blob content");
  }
}

export default function Course() {
  const router = useRouter();
  const { courseName } = router.query;
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    if (typeof courseName === "string") {
      getReadme(courseName)
        .then((resContent) => {
          setContent(resContent);
        })
        .catch((err) => console.error(err));
    }
  }, [courseName]);

  return (
    <div>
      <ReactMarkdown className="prose">{content}</ReactMarkdown>
    </div>
  );
}
