import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import { NextPage } from "next";

type GetLayout = (page: React.ReactNode) => React.ReactNode;

type Page<P = {}> = NextPage<P> & {
  // getLayout?: (page: React.ReactNode) => React.ReactNode;
  showSidebar: boolean;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  // nested layout
  // const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  const showSidebar = Component.showSidebar ?? true;

  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex">
        <Navbar />
        {showSidebar && <Sidebar />}
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
