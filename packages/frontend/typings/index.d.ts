type EventMetadata = {
  name: string;
  description: string;
  location: string;
  date: string;
};

type NFTMetadata = {
  name: string;
  external_link: string;
  description: string;
  attributes: Array<Record<string, any>>;
};
