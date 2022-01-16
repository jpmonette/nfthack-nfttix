// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage, Blob } from "nft.storage";
import fs from "fs";

type Data = {
  success: boolean;
  url: string;
};

const apiKey = process.env.NFTSTORAGE_KEY as string;

const client = new NFTStorage({ token: apiKey });

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const file = fs.readFileSync("./pages/api/favicon.png");
  const fileCid = await client.storeBlob(new Blob([file]));
  const fileUrl = "https://ipfs.io/ipfs/" + fileCid;

  const metadataObject = {
    name: "Pinpie",
    description: "Pin is not delicious beef!",
    image: fileUrl,
  };
  // @ts-ignore
  const metadata = new Blob(JSON.stringify(metadataObject), {
    type: "application/json",
  });

  const metadataCid = await client.storeBlob(metadata);
  const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;

  res.status(200).json({
    success: true,
    url: metadataUrl,
  });
};

export default handler;
