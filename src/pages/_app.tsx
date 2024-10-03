import "@/styles/globals.css";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@material-tailwind/react";
import LayoutClient from "@/layouts/client";
import LayoutAdmin from "@/layouts/admin";
import { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  const isAdminRoute = pathname.includes("/admin");

  const Layout = isAdminRoute ? LayoutAdmin : LayoutClient;

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const scriptTag = document.createElement("script");
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", clientKey!);
    scriptTag.async = true;
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
