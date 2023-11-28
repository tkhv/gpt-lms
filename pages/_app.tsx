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
import { useEffect, useState } from "react";
import { NextPage } from "next";
import NavbarLayout from "@/components/NavbarLayout";
import { Layout } from "lucide-react";

type GetLayout = (page: React.ReactNode) => React.ReactNode;

type Page<P = {}> = NextPage<P> & {
  // getLayout?: (page: React.ReactNode) => React.ReactNode;
  showSidebar: boolean;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
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

  // const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  // const [showSidebar, setShowSidebar] = useState(false);
  const showSidebar = Component.showSidebar ?? true;

  const router = useRouter();

  const courseList: CourseList = [
    { id: 1, name: "cs3312" },
    { id: 2, name: "cs2200" },
    { id: 3, name: "cs4400" },
  ];
  const { isTA, setIsTA } = useUserTypeContext();

  // useEffect(() => {
  //   setShowSidebar(!router.pathname.startsWith("/dashboard"));
  // }, []);

  // const showSidebar = !router.pathname.startsWith("/dashboard");
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
