import Blockies from "react-blockies";
import { ethers, utils } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar } from "../../components/Navbar";
import { useWallet } from "../../hooks/useWalletConnect";
import NFTixJSON from "../../artifacts/NFTix.json";
import { NFTix } from "../../typings/NFTix";
import { useEffect, useState } from "react";
import { formatAccount } from "../../libs/helpers";

const Home: NextPage = () => {
  const router = useRouter();
  const { account, provider } = useWallet();
  const [eventName, setEventName] = useState<string>();
  const [buying, setBuying] = useState(false);
  const [owners, setOwners] = useState<
    Array<{ address: string; name?: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  const eventId = router.query.eventId;

  const refreshAttendees = async () => {
    const contract = new ethers.Contract(
      router.query.eventId as string,
      NFTixJSON.abi,
      provider
    ) as NFTix;

    try {
      const ownerIds = [];
      setLoading(true);
      for (let i = 1; i < 100; i++) {
        try {
          const ownerId = await contract.ownerOf(i);
          //   console.log(
          //     "resolve:",
          //     await provider.lookupAddress(
          //       "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
          //     )
          //   );
          console.log("ownerId", ownerId);
          ownerIds.push({ address: ownerId });
        } catch (e) {
          break;
        }
      }
      setOwners(ownerIds);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const init = async () => {
    const contract = new ethers.Contract(
      router.query.eventId as string,
      NFTixJSON.abi,
      provider
    ) as NFTix;

    try {
      const name = await contract.name();
      setEventName(name);
      await refreshAttendees();
    } catch (e) {
      console.log(e);
      //   init();
    }
  };

  // https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/admission-tickets_1f39f-fe0f.png

  useEffect(() => {
    init();
  }, [router, provider]);

  const handleBuy = async () => {
    if (!provider) return;
    const contract = new ethers.Contract(
      router.query.eventId as string,
      NFTixJSON.abi,
      provider.getSigner()
    ) as NFTix;
    try {
      setBuying(true);
      console.log("buying");
      const tx = await contract.awardItem(
        account as string,
        "https://ipfs.io/ipfs/bafkreiecvt2clubn47ynz6s7d4zkufdk2g7hgdr4xje3rgjk7yww67wzm4"
        // { value: utils.parseEther("0.01") }
      );
      console.log("tx", tx);
    } catch (e) {
      console.log("error", e);
    } finally {
      setBuying(false);
    }

    console.log("Contract deployed to:", contract.address);
  };

  return (
    <>
      <Head>
        <title>NFTHack 2022 - NFTix</title>
      </Head>

      <div className={"container"}>
        <div className="row justify-content-center">
          <div className="col-5">
            <nav className={"mb-5"}>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href={"/"}>
                    <a>Home</a>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {eventName}
                </li>
              </ol>
            </nav>
            <button
              type="button"
              className="btn btn-primary float-end"
              onClick={handleBuy}
              disabled={buying}
            >
              {buying && (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Buying...
                </>
              )}{" "}
              {!buying && (
                <>
                  <i className="bi bi-ticket-detailed"></i> Buy Ticket
                </>
              )}
            </button>
            <h1>{eventName}</h1>
            <table className="table font-monospace mt-4">
              <thead>
                <th>Ticket ID</th>
                <th className="text-right">Attendees</th>
              </thead>
              <tbody>
                {owners.map((owner, key) => (
                  <tr key={key}>
                    <td>#{key + 1}</td>
                    <td className="font-monospace">
                      <div className="d-flex align-middle">
                        <Blockies
                          seed={owner.address}
                          size={6}
                          scale={4}
                          className={"rounded-3 me-2"}
                        />
                        <a
                          href={`https://mumbai.polygonscan.com/address/${eventId}`}
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          {formatAccount(owner.address)}
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && owners.length === 0 && (
                  <tr>
                    <td colSpan={2}>No attendee</td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
            <br />
            <ul className="list-group mt-5  font-monospace">
              <li className="list-group-item">
                Ethereum Address{" "}
                <a
                  href={`https://mumbai.polygonscan.com/address/${eventId}`}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <code className="float-end">
                    {formatAccount(eventId as string)}
                  </code>
                </a>
              </li>
              {/* <li className="list-group-item">IPFS File</li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
