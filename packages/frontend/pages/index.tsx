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

      <div className="bg-light">
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
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Features</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <i
                className="bi bi-cash"
                style={{ fontSize: 40, color: "white" }}
              ></i>
            </div>
            <h2>Powered by Polygon</h2>
            <p>NFTix 🎟 is powered .</p>
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: 40, color: "white" }}
              />
            </div>
            <h2>Guestlist</h2>
            <p>
              Manually select a guestlist using{" "}
              <a href="https://ens.domains/">ENS Domains</a> or by wallet ID.
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#toggles2"></use>
              </svg>
            </div>
            <h2>Featured title</h2>
            <p>
              Paragraph of text beneath the heading to explain the heading.
              We&apos;ll add onto it with another sentence and probably just
              keep going until we run out of words.
            </p>
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use xlinkHref="#chevron-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Roadmap</h2>

        <ul className="fs-1">
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Home;

const formatAccount = (addr: string) =>
  addr.slice(0, 6) + "..." + addr.slice(addr.length - 4);
