import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useWallet } from "../hooks/useWalletConnect";
import Moralis from "moralis";

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

      <div className="px-4 pt-5 mt-5 text-center border-bottom">
        <h1 className="display-5 fw-bold">Supercharge Your Events Now! 🎟</h1>
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
            <Link href="/events/0x157b4dEB2EB6D564b4e6435A4C8E393B5eC218cB">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                See Events
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="container pt-5">
            <img
              src="/images/screenshot.png"
              className="img-fluid rounded-3"
              alt="Example image"
              width="600"
            />
          </div>
        </div>
      </div>

      <div className="bg-light border-bottom">
        <div className="container px-4 py-5" id="featured-3">
          <h2 className="pb-2 border-bottom mb-5">Our Tech Stack</h2>
          <div className="d-flex justify-content-evenly">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/IPFS_logo.png"
              height="100"
            />
            <img
              src="https://avatars.githubusercontent.com/u/34167658?s=200&v=4"
              height="100"
            />
            <img
              src="https://polygon.technology/wp-content/uploads/2021/12/Polygon-Primary-Color-Dark.svg"
              height="100"
            />
          </div>
          <div className="d-flex justify-content-evenly mt-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
              height="100"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1920px-React-icon.svg.png"
              height="100"
            />
          </div>
        </div>
      </div>
      <div className="container px-4 py-5 border-bottom">
        <h2 className="pb-2 border-bottom">Features</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon">📈</div>
            <h2 className="fs-4">Unlock Resale Revenue </h2>
            <p>
              Customise event resale conditions with smart contracts & gain
              profit from royalties.
              <br />
              Save costs by using the power of the blockchain.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon">🎟</div>

            <h2 className="fs-4">NFT-based Tickets</h2>
            <p>
              Painless creation & management of your events using NFT-based
              tickets. Use NFTix to create your events, and give full freedom to
              your attendees to safely transfer & resell their tickets anywhere!
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon">🔒</div>

            <h2 className="fs-4">Fraud Protection</h2>
            <p>
              Limit counterfeiting and fake ticket sales. Protect your customers
              & guarantee event authenticity by hardwiring security into
              transitions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const formatAccount = (addr: string) =>
  addr.slice(0, 6) + "..." + addr.slice(addr.length - 4);
