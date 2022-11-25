export interface NFT {
    itemId: string;
    tokenId: string;
    nftAddress: string;
    price: number;
    listingPrice: number;
    finalPrice: number;
    seller: string;
    isSold: boolean;
    metadata: {
        image: string;
        name: string;
        description: string;
    };
}
