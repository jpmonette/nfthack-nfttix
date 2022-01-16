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
import {
  createTokenMetadata,
  formatAccount,
  lookupENS,
  polygonProvider,
} from "../../libs/helpers";
import { DateTime } from "luxon";

const Home: NextPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const { account, provider } = useWallet();
  const [eventName, setEventName] = useState<string>();
  const [buying, setBuying] = useState(false);
  const [owner, setOwner] = useState<string>();
  const [owners, setOwners] = useState<
    Array<{ address: string; name?: string | null }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<EventMetadata>({
    name: "",
    location: "",
    description: "",
    date: "",
  });
  const [metadataUri, setMetadataUri] = useState<string>();
  const [initialLoad, setInitialLoad] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const eventId = router.query.eventId as string;

  const refreshAttendees = async () => {
    const contract = new ethers.Contract(
      router.query.eventId as string,
      NFTixJSON.abi,
      polygonProvider
    ) as NFTix;

    try {
      const ownerIds = [];
      setLoading(true);
      for (let i = 1; i < 100; i++) {
        try {
          const ownerId = await contract.ownerOf(i);
          console.log("ownerId", ownerId);
          ownerIds.push({ name: await lookupENS(ownerId), address: ownerId });
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
      eventId,
      NFTixJSON.abi,
      polygonProvider
    ) as NFTix;

    try {
      const name = await contract.name();
      const owner = await contract.owner();
      const metadataURI = await contract.metadata();
      const metadataResponse = await fetch(metadataURI);
      const metadata = await metadataResponse.json();
      setEventName(name);
      setOwner(owner);
      setMetadata(metadata);
      setMetadataUri(metadataURI);
      setInitialLoad(false);
      await refreshAttendees();
    } catch (e) {
      setNotFound(true);
      console.log(e);
    } finally {
      setInitialLoad(false);
    }
  };

  // https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/admission-tickets_1f39f-fe0f.png

  useEffect(() => {
    init();
  }, [router, provider]);

  const isOwner = () => account === owner;

  const handleGive = () => {
    const recipient = prompt("Insert an address to give to:");

    if (recipient?.length === 42) buy(recipient);
  };

  const handleBuy = () => {
    buy(account as string);
  };

  const handleInviteCelebrity = () => {
    buy("0xd8da6bf26964af9d7eed9e03e53415d37aa96045");
  };

  const buy = async (recipient: string) => {
    if (!provider) return;

    const contract = new ethers.Contract(
      eventId,
      NFTixJSON.abi,
      provider.getSigner()
    ) as NFTix;
    try {
      setBuying(true);
      const url = await createTokenMetadata({
        name: metadata.name + ` (${owners.length})`,
        description: metadata.description,
        external_link: `https://nftix.jpmo.net/events/${eventId}`,
        attributes: [
          {
            display_type: "date",
            trait_type: "Date",
            value: DateTime.fromISO(metadata.date, {
              locale: "en",
            }).toMillis(),
          },
          {
            trait_type: "Location",
            value: location,
          },
          {
            trait_type: "Ticket Type",
            value: "VIP",
          },
        ],
      });
      const tx = await contract.awardItem(
        recipient,
        url // { value: utils.parseEther("0.01") }
      );
      console.log("tx", tx);
    } catch (e) {
      console.log("error", e);
    } finally {
      setBuying(false);
      setTimeout(() => {
        refreshAttendees();
      }, 2000);
    }

    console.log("Contract deployed to:", contract.address);
  };

  return (
    <>
      <Head>
        <title>View Event - NFTix</title>
      </Head>

      <div className={"container"}>
        <div className="row justify-content-center">
          <div className="col-8">
            <nav className={"mb-3"}>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href={"/"}>
                    <a>Home</a>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {initialLoad && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {eventName}
                  {notFound && <>404 🙈</>}
                </li>
              </ol>
            </nav>
            {notFound && <h1 className="text-center">event not found 🙈</h1>}
            {!initialLoad && !notFound && (
              <>
                <h1>{eventName}</h1>
                <p className="lead">
                  <span className="float-end"> 📍 {metadata.location}</span>
                  📆{" "}
                  {DateTime.fromISO(metadata.date, {
                    locale: "en",
                  }).toLocaleString(DateTime.DATE_FULL)}{" "}
                  <br />
                </p>

                {isOwner() && (
                  <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          tab === "overview" ? "active" : ""
                        }`}
                        onClick={() => setTab("overview")}
                      >
                        Event Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          tab === "admin" ? "active" : ""
                        }`}
                        onClick={() => setTab("admin")}
                      >
                        Settings
                      </button>
                    </li>
                  </ul>
                )}

                {tab === "overview" && (
                  <>
                    <code
                      dangerouslySetInnerHTML={{
                        __html: metadata.description.replace(
                          /(?:\r\n|\r|\n)/g,
                          "<br>"
                        ),
                      }}
                    ></code>
                    <div
                      className="text-center mt-4"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        className="btn btn-primary me-1 btn-lg"
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
                      <button
                        type="button"
                        className="btn btn-danger btn-lg me-1"
                        onClick={handleGive}
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
                            <i className="bi bi-heart"></i> Give a Ticket
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark btn-lg"
                        onClick={handleInviteCelebrity}
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
                            <i className="bi bi-star-fill"></i> Invite Vitalik
                          </>
                        )}
                      </button>
                    </div>
                    <table className="table font-monospace mt-4 mb-4">
                      <thead>
                        <th style={{ width: 10 }}>ID</th>
                        <th className="text-center">Attendees</th>
                        <th className="text-end">Actions</th>
                      </thead>
                      <tbody>
                        {owners.map((owner, key) => (
                          <tr key={key}>
                            <td>#{key + 1}</td>
                            <td className="text-center">
                              <Blockies
                                seed={owner.address}
                                size={6}
                                scale={4}
                                className={"rounded-3 me-2"}
                              />
                              <a
                                href={`https://mumbai.polygonscan.com/address/${owner.address}`}
                                target={"_blank"}
                                rel="noreferrer"
                              >
                                {owner.name && owner.name}
                                {!owner.name && formatAccount(owner.address)}
                              </a>
                            </td>
                            <td className="text-end">
                              <a
                                className="btn btn-dark btn-sm"
                                href={`https://testnets.opensea.io/assets/mumbai/${eventId}/${
                                  key + 1
                                }`}
                                target={"_blank"}
                                rel="noreferrer"
                              >
                                View on OpenSea
                              </a>
                            </td>
                          </tr>
                        ))}
                        {!initialLoad && !loading && owners.length === 0 && (
                          <tr>
                            <td colSpan={3} className="text-center">
                              No attendee 😭
                            </td>
                          </tr>
                        )}
                        {initialLoad ||
                          (loading && (
                            <tr>
                              <td colSpan={3}>
                                <div className="d-flex justify-content-center">
                                  <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </>
                )}
                {tab === "admin" && isOwner() && (
                  <div className="card bg-light mb-4">
                    <div className="card-body">
                      <h5 className="card-title">
                        Organizer Controls (soon ✨)
                      </h5>
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary"
                          type="button"
                          disabled
                        >
                          Collect Sales Fee
                        </button>
                        <button
                          className="btn btn-danger"
                          type="button"
                          disabled
                        >
                          Refund All Guests
                        </button>
                        <button
                          className="btn btn-danger"
                          type="button"
                          disabled
                        >
                          Freeze Sales
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <br />
                <br />
                <ul className="list-group mt-5 font-monospace">
                  <li className="list-group-item">
                    Polygon Address
                    <a
                      href={`https://mumbai.polygonscan.com/address/${eventId}`}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <code className="float-end">
                        {formatAccount(eventId as string)}{" "}
                        <i className="bi bi-box-arrow-up-right"></i>
                      </code>
                    </a>
                  </li>
                  <li className="list-group-item">
                    Event Metadata (IPFS)
                    <a href={metadataUri} target={"_blank"} rel="noreferrer">
                      <code className="float-end">
                        {formatAccount(
                          metadataUri?.split("/")[
                            metadataUri?.split("/").length - 1
                          ] as string
                        )}{" "}
                        <i className="bi bi-box-arrow-up-right"></i>
                      </code>
                    </a>
                  </li>
                  {/* <li className="list-group-item">IPFS File</li> */}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
