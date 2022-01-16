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
  const metadata = new Blob(
    // @ts-ignore
    JSON.stringify({
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
    }),
    {
      type: "application/json",
    }
  );

  const metadataCid = await client.storeBlob(metadata);
  const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;

  res.status(200).json({
    success: true,
    url: metadataUrl,
  });
};

export default handler;
