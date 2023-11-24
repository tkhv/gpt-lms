import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import { CourseContextProvider } from "../context/courseContext";
import { CourseList, User } from "@/lib/types";
import { UserTypeContextProvider } from "../context/userTypeContext";

export default async function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // This is from next-auth after OAuth login
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
    return null;
  }
  if (!session) {
    return;
  }
  const user: User = {
    id: parseInt(session.user.id),
    email: session.user.email || "",
    name: session.user.name || "",
    image: session.user.image || "",
  };
  // console.log(session?.user.name);
  // console.log(session?.user.email);
  // console.log(session?.user.image);
  // console.log(session?.user.id);

  /* courseList using useContext is reset when refreshing, so I commented it out for now.
  maybe extract the courseList by using api call here would be better
  */
  // const { userId, setUserId, courseList, setCourseList } = useUserContext();

  const courseList: CourseList = [
    { id: 1, name: "cs3312" },
    { id: 2, name: "cs2200" },
    { id: 3, name: "cs4400" },
  ];

  return (
    <div className="flex">
      <UserTypeContextProvider>
        <CourseContextProvider>
          <Navbar courseList={courseList} user={user} />
          {children}
        </CourseContextProvider>
      </UserTypeContextProvider>
    </div>
  );
}
