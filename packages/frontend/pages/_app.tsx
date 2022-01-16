import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
// import '../styles/globals.css'
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { useWallet } from "../hooks/useWalletConnect";

function MyApp({ Component, pageProps }: AppProps) {
  const wallet = useWallet();

  console.log(wallet);
  if (
    // !wallet.account ||
    !wallet.provider
  ) {
    return <></>;
  }

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
