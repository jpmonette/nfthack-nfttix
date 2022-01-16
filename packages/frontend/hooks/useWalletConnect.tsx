import { Web3Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, providers } from "ethers";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { lookupENS } from "../libs/helpers";

export function useWallet() {
  const [provider, setProvider] = useState<Web3Provider>();
  const [account, setAccount] = useState<string>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const provider = await detectEthereumProvider();

      const ethersProvider = new providers.Web3Provider(
        provider as ethers.providers.ExternalProvider
      );

      const accounts = await ethersProvider.listAccounts();
      const alias = await lookupENS(accounts[0]);
      setAccount(alias || accounts[0]);
      setProvider(ethersProvider);
    } catch (e) {
      console.log(e);
    }
  };

  const connect: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      // @ts-ignore
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error(error);
    }
  };

  return { account, provider, connect };
}
