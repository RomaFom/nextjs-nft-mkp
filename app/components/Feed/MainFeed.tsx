interface NFT {
  itemId: string;
  tokenId: string;
  nftAddress: string;
  price: number;
  listingPrice: number;
  seller: string;
  isSold: boolean;
  metadata: {
    image: string;
    name: string;
    description: string;
  };
}

async function getFeed(): Promise<NFT[]> {
  const response = await fetch(process.env.CORE_API + "web3/items");
  return await response.json();
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function MainFeed() {
  const feed = await getFeed();
  console.log("feed");
  return (
    <>
      <div className="fill-emerald-200">
        {feed &&
          feed.length &&
          feed.map((item) => {
            return (
              <div key={item.itemId}>
                <h1>{item.metadata.name}</h1>
                {/*<img src={item.metadata.image} alt={item.metadata.name} />*/}
              </div>
            );
          })}
      </div>
    </>
  );
}
