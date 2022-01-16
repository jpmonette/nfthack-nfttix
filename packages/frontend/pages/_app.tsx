import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { useWallet } from "../hooks/useWalletConnect";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const wallet = useWallet();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);
  console.log(wallet);
  if (!ready) {
    return <></>;
  }

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
