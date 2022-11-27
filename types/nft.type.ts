export interface NftMetadataDto {
    image: string;
    name: string;
    description: string;
}

export interface MarketplaceItemDto {
    itemId: number;
    nftAddress: string;
    tokenId: number;
    price: number;
    listingPrice: number;
    finalPrice: number;
    seller: string;
    isSold: boolean;
    metadata: NftMetadataDto;
}
