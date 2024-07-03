import "@/styles/globals.css";
//Next/React
import { useRouter } from "next/router";
import { useEffect } from "react";
// Types
import type { AppProps } from "next/app";
// Libaries
import { useAuthState } from "react-firebase-hooks/auth"; // we can tell whether or not user is logged in
import nookies from "nookies"; // store firebase auth token as a cookie, so it gets sent to server
// Utils
import { inter } from "@/utils/fonts"; // Inter font
import { auth } from "@/utils/firebase"; // Auth object from firebase, which keeps track of logged in user
// Components
import Navbar from "@/components/Navigation/Navbar";


/**
 * 1) Redirects user to the correct page
 *  a) if logged in, redirects to home page if they're on login/signup/reset or landing page
 *  b) if not logged in, redirects to landing page if they're on profile/settings/home page
 */
export default function App({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth); // pass in the firebase auth object, which keeps track of user info, and useAuthState returns it to you
  const router = useRouter();

  // REDIRECTING USERS
  useEffect(() => {
    // Redirect to home page
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

  return (
    <div className={`${inter.className} antialiased`}>
      <Navbar user={user} />
      <div className="box-border px-6">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
