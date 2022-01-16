import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import NFTixJSON from "../artifacts/NFTix.json";
import { useWallet } from "../hooks/useWalletConnect";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const sampleDescription = `Connecting creatives with engineers to build a fair future

Moving things to the blockchain is no easy task and creators, engineers, and doers are finding novel ways to distribute, tokenize, and sell their digital work.

NFTs have come a long way from CryptoKitties 🐈  and people are paying millions to own a part of the new internet. Whether art, music, digital land, or tradable planets -- NFTs are becoming the zeitgeist of 2022.

We believe that magic happens when you match creators and artists to engineers and builders. Two builders of different sorts together can create a fair future for any who create.

At ETHGlobal, we're building on the success of ETHOnline, HackMoney, and more than a dozen events to deliver a hackathon, summit, and celebration of this moment in NFT and crypto history. Join us to create the new fair future.`;

const Home: NextPage = () => {
  const router = useRouter();
  const { provider } = useWallet();
  const [eventName, setEventName] = useState<string>("NFTHack 2022");
  const [eventDate, setEventDate] = useState<string>("2022-01-16");
  const [location, setLocation] = useState<string>();
  const [description, setDescription] = useState<string>(sampleDescription);

  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    if (!eventName) {
      alert("You must select an event name!");
      return;
    }

    if (!eventDate) {
      alert("You must select an event date!");
      return;
    }

    if (!location) {
      alert("You must set a location!");
      return;
    }

    if (!description) {
      alert("You must write a description!");
      return;
    }

    const metadata: EventMetadata = {
      name: eventName,
      date: eventDate,
      location,
      description,
    };

    const response = await fetch("/api/create-event-metadata", {
      method: "post",
      body: JSON.stringify(metadata),
      headers: { "Content-Type": "application/json" },
    });

    const { url } = await response.json();

    const contractFactory = new ethers.ContractFactory(
      NFTixJSON.abi,
      NFTixJSON.bytecode,
      provider?.getSigner()
    );
    const contract = await contractFactory.deploy(eventName, "NFTix", url);

    setLoading(true);
    await contract.deployed();
    setLoading(true);

    console.log("Contract deployed to:", contract.address);
    router.push(`/events/${contract.address}`);
  };

  return (
    <>
      <Head>
        <title>New Event - NFTix</title>
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
                  New Event
                </li>
              </ol>
            </nav>
            <h1>New Event</h1>

            <div className="mb-3">
              <label htmlFor="event-name" className="form-label">
                Event Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="event-name"
                placeholder="NFTHack 2022"
                value={eventName}
                onChange={(e) => setEventName(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                placeholder="2022/01/16"
                value={eventDate}
                onChange={(e) => setEventDate(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location:
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Remote"
                value={location}
                onChange={(e) => setLocation(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="description"
                placeholder="This will be the greatest event..."
                value={description}
                rows={5}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>
            <div className="card bg-info mb-4">
              <div className="card-body">
                <h5 className="card-title">Coming Soon ✨</h5>

                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="ticket-count" className="form-label">
                      Tickets available:
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="ticket-count"
                        placeholder="10"
                        disabled={true}
                      />
                      <span className="input-group-text" id="basic-addon2">
                        ticket(s)
                      </span>
                    </div>
                  </div>
                  <div className="col mb-3">
                    <label htmlFor="ticket-count" className="form-label">
                      Ticket Price:
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="ticket-count"
                        placeholder="0.1"
                        disabled={true}
                      />
                      <span className="input-group-text" id="basic-addon2">
                        MATIC
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" mb-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    disabled
                  />{" "}
                  <label className="form-check-label">
                    Allow ticket holders to resell their ticket
                  </label>
                </div>
                <div className="ms-3 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    disabled
                  />{" "}
                  <label className="form-check-label">
                    Freeze Resell Price{" "}
                    <span className="badge bg-warning text-dark">
                      Scalper Protection
                    </span>
                  </label>
                </div>
                <div className="col mb-3">
                  <label htmlFor="ticket-count" className="form-label">
                    Send invites to:
                  </label>
                  <div
                    className="form-control"
                    style={{ background: "#e9ecef" }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm me-2 font-monospace"
                    >
                      juanbeneth.eth <i className="bi bi-x"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm font-monospace me-2"
                    >
                      ginge.eth <i className="bi bi-x"></i>
                    </button>
                    <button type="button" className="btn btn-light btn-sm">
                      <i className="bi bi-plus"></i> Add Invite
                    </button>
                  </div>
                  <small>Search by ENS domain or address.</small>
                </div>
              </div>
            </div>
            <div className="btn-group float-end" role="group">
              <Link href={"/"}>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={loading}
                >
                  Cancel
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDeploy}
                disabled={loading}
              >
                {loading && (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{" "}
                    Creating...
                  </>
                )}{" "}
                {!loading && "Create Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
