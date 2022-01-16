import Head from "next/head";
import Link from "next/link";
import Blockies from "react-blockies";
import { useWallet } from "../hooks/useWalletConnect";
import { formatAccount } from "../libs/helpers";

export const Navbar = () => {
  const { account, connect } = useWallet();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <nav
        className="navbar navbar-light mb-5"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container">
          <Link href={"/"}>
            <a className="navbar-brand fw-bold font-monospace">🎟 NFTix</a>
          </Link>
          <form className="d-flex">
            {!account && (
              <>
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  onClick={() => connect()}
                >
                  Connect
                </button>
              </>
            )}
            {account && (
              <>
                <Blockies
                  seed={account}
                  size={10}
                  scale={4}
                  className={"rounded-3 me-2"}
                />
                <button className="btn btn-outline-primary" type="submit">
                  {formatAccount(account)}
                </button>
              </>
            )}
          </form>
        </div>
      </nav>
    </>
  );
};
