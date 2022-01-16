import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useWallet } from "../hooks/useWalletConnect";

const Home: NextPage = () => {
  const { account, provider } = useWallet();

  const getNFTS = async () => {
    // await Moralis.start({
    //   serverUrl: "https://sk4g8wzybjut.usemoralis.com:2053/server",
    //   appId: "4iGS1wE2SOf69hNX7U1DCRw7tctB8yl3QASxGYk0",
    // });
    // const NFTs = await Moralis.Web3API.token.searchNFTs({
    //   q: "nftix",
    //   chain: "mumbai",
    //   filter: "name",
    // });
    // console.log(NFTs);
  };

  return (
    <>
      <Head>
        <title>NFTix</title>
      </Head>

      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Welcome to NFTix 🎟</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            NFTix is an event ticketing system that makes it easy for an event
            organizer to sell a limited amount of tickets for an event.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link href={"/new"}>
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Create an Event
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
              onClick={() => getNFTS()}
            >
              See Events
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const formatAccount = (addr: string) =>
  addr.slice(0, 6) + "..." + addr.slice(addr.length - 4);
