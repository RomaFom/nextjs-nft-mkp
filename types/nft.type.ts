export interface NftMetadataDto {
    image: string;
    name: string;
    description: string;
}

export interface MarketplaceItemDto {
    ItemId: number;
    // nftAddress: string;
    TokenId: number;
    Price: string;
    ListingPrice: string;
    TotalPrice: string;
    Seller: string;
    IsSold: boolean;
    Nft: NftMetadataDto;
}
