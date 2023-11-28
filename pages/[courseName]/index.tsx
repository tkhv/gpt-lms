import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import type { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

type CourseProps = {
  courseName: string;
};

// export default function Course({ courseName }: CourseProps) {
export default function Course() {
  const router = useRouter();
  const { courseName } = router.query;
  return <p>Name: {courseName}</p>;
}

/* This function gets called at build time to define
the possible options for the dynamic route. We fetch 
the courseList for the logged in user and pre-render 
those. */
// export const getStaticPaths: GetStaticPaths = (async () => {
//   // Call our API to get courseList for this user.
//   // This is dummy data
//   const courseList = [
//     { name: "cs2200" },
//     { name: "cs3312" },
//     { name: "cs4400" },
//   ];

//   const paths = courseList.map((course) => ({
//     params: { courseName: course.name },
//   }));

//   // { fallback: false } means other routes should 404.
//   return {
//     paths: paths,
//     fallback: false,
//   };
// }) satisfies GetStaticPaths;

// // pre-render this page at build time
// export const getStaticProps: GetStaticProps<CourseProps> = async ({
//   params,
// }) => {
//   if (!params || typeof params.courseName !== "string") {
//     return {
//       notFound: true,
//     };
//   }

//   const courseName = params.courseName;
//   return { props: { courseName } };
// };

// Course.getLayout = function (page: React.ReactNode) {
//   return <Layout>{page}</Layout>;
// };
