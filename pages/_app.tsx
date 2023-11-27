import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { CourseContextProvider } from "@/context/courseContext";
import {
  UserTypeContextProvider,
  useUserTypeContext,
} from "@/context/userTypeContext";
import { CourseList, User } from "@/lib/types";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import { UserContextProvider } from "@/context/userContext";

export default function App({ Component, pageProps }: AppProps) {
  // const session = await auth(); // This is from next-auth after OAuth login
  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/dashboard");
  //   return null;
  // }
  // if (!session) {
  //   return;
  // }
  // const user: User = {
  //   id: parseInt(session.user.id),
  //   email: session.user.email || "",
  //   name: session.user.name || "",
  //   image: session.user.image || "",
  // };

  const router = useRouter();

  const courseList: CourseList = [
    { id: 1, name: "cs3312" },
    { id: 2, name: "cs2200" },
    { id: 3, name: "cs4400" },
  ];
  const { isTA, setIsTA } = useUserTypeContext();

  const showSidebar = !router.pathname.startsWith("/dashboard");
  return (
    <UserContextProvider>
      <UserTypeContextProvider>
        <CourseContextProvider>
          <SessionProvider session={pageProps.session}>
            <div className="flex">
              <Navbar courseList={courseList} />
              {showSidebar && <Sidebar />}
              <Component {...pageProps} />
            </div>
          </SessionProvider>
        </CourseContextProvider>
      </UserTypeContextProvider>
    </UserContextProvider>
  );
}
