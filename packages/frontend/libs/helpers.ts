import { ethers } from "ethers";

export const formatAccount = (addrOrName: string) => {
  if (!addrOrName) return "";
  if (addrOrName.length < 42) return addrOrName;
  return (
    addrOrName.slice(0, 6) + "..." + addrOrName.slice(addrOrName.length - 4)
  );
};

export const polygonProvider = new ethers.providers.InfuraProvider(
  80001,
  "c23e0ee5c2354296b3b3fd4a5660d653"
);

const ensProvider = new ethers.providers.InfuraProvider(
  1,
  "b2739ca77ece4bcbad773aad86fb9d19"
);

export const lookupENS = (addr: string) => {
  return ensProvider.lookupAddress(addr);
};

export const createTokenMetadata = async (metadata: NFTMetadata) => {
  const response = await fetch("/api/nftstorage", {
    method: "post",
    body: JSON.stringify(metadata),
    headers: { "Content-Type": "application/json" },
  });

  const { url } = await response.json();

  return url;
};
