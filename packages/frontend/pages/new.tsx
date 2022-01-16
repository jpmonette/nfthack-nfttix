import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import NFTixJSON from "../artifacts/NFTix.json";
import { useWallet } from "../hooks/useWalletConnect";

const Home: NextPage = () => {
  const router = useRouter();
  const { provider } = useWallet();
  const [eventName, setEventName] = useState<string>();
  const [description, setDescription] = useState<string>();

  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    if (!eventName) {
      alert("You must select an event name!");
      return;
    }

    const contractFactory = new ethers.ContractFactory(
      NFTixJSON.abi,
      NFTixJSON.bytecode,
      provider?.getSigner()
    );
    const contract = await contractFactory.deploy(eventName, "NFTix");

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
            <div className="mb-3">
              <label htmlFor="ticket-count" className="form-label">
                Amount of tickets (soon):
              </label>
              <input
                type="text"
                className="form-control"
                id="ticket-count"
                placeholder="10"
                disabled={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ticket-count" className="form-label">
                Amount of tickets (soon):
              </label>
              <input
                type="text"
                className="form-control"
                id="ticket-count"
                placeholder="10"
                disabled={true}
              />
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
                    Deploying...
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
