import { Web3Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, providers } from "ethers";
import React, { useEffect, useState } from "react";

export function useWallet() {
  const [provider, setProvider] = useState<Web3Provider>();
  const [account, setAccount] = useState<string>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const provider = await detectEthereumProvider();

    const ethersProvider = new providers.Web3Provider(
      provider as ethers.providers.ExternalProvider
    );

    const accounts = await ethersProvider.listAccounts();
    setAccount(accounts[0]);
    setProvider(ethersProvider);
  };

  const connect = async () => {
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
