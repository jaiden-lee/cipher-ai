import "@/styles/globals.css";
//Next/React
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Types
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
// Libaries
import { useAuthState } from "react-firebase-hooks/auth"; // we can tell whether or not user is logged in
import nookies from "nookies"; // store firebase auth token as a cookie, so it gets sent to server
import {Analytics} from "@vercel/analytics/react";
// Utils
import { inter } from "@/utils/fonts"; // Inter font
import { auth } from "@/utils/firebase"; // Auth object from firebase, which keeps track of logged in user
// Components
import Navbar from "@/components/Navigation/Navbar";
const GenericLoading = dynamic(() => import("@/components/Loading/GenericLoading"), {ssr: false});


/**
 * 1) Redirects user to the correct page
 *  a) if logged in, redirects to home page if they're on login/signup/reset or landing page
 *  b) if not logged in, redirects to landing page if they're on profile/settings/home page
 */
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [user, loading, error] = useAuthState(auth); // pass in the firebase auth object, which keeps track of user info, and useAuthState returns it to you
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(false);

  // REDIRECTING USERS
  useEffect(() => {
    // Redirect to home page
    if (loading) {
      return;
    } // this prevents the app from redirecting user to landing page on refresh since auth is still loading
    if (user) {
      if (router.pathname == "/" || router.pathname == "/login" || router.pathname == "/signup" || router.pathname == "/reset") {
        router.push("/home");
      }
    } else {
      // Redirect to landing page
      if (router.pathname == "/home" || router.pathname.startsWith("/profile")) {
        router.push("/");
      }
    }
  }, [user, loading, router]); // reruns when the user changes, the auth finishes loading in user, or the URL changes (router)

  // Listens for changes in firebase JWT, and sets it as a cookie
  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      // User not signed in
      if (!user) {
        nookies.set(undefined, "token", "", {path: "/"}); // the path:"/" ensures it overrides the previous token each time I believe, rather than making a new cookies for it
      } else {
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, {path: "/"});
      }
    });

    return unsubscribe;
  }, []);

  // Listens for route change, and if route changes, displays the loading component
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setPageLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };

  }), [router];
  
  // if (loading || pageLoading) {
  //   return <GenericLoading />
  // }

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <div className={`${inter.className} antialiased h-[100dvh]`}>
      {(loading || pageLoading) && <GenericLoading />}
      <Navbar user={user} />
      <div className="box-border px-6 flex-1">
        {getLayout(<Component {...pageProps} />)}
      </div>

      <Analytics />
    </div>
  );
}


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 