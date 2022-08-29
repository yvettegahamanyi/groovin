import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/tailwind.css";
import { GlobalContext } from "../components/context/GlobalContext";

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //styles of nprogress
import { RouteGuard } from "../components/context/RouteGuard";
//Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// eslint-disable-next-line
import "swiper/css/bundle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <RouteGuard>
    <GlobalContext>
      <div>
        <Head>
          <title>Groovinx</title>
          {/* <meta name="description" content="" /> */}
          <meta name="theme-color" content="#EC6448" />
          <link rel="icon" href="/assets/images/logo.ico"/>
        </Head>
        <div className="md:flex justify-center">
      <div className="md:w-2/3 lg:w-1/3">
        <Component {...pageProps} />
        </div>
        </div>
      </div>
    </GlobalContext>
      // </RouteGuard>
  );
}
export default MyApp;
