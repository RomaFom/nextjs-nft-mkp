// export interface NftMetadataDto {
//     image: string;
//     name: string;
//     description: string;
//     owner: string;
// }

export interface MarketplaceItemDto {
    is_sold: boolean;
    item_id: number;
    listing_price: string;
    nft: {
        description: string;
        id: number;
        image: string;
        name: string;
        nft_id: number;
        owner: string;
    };
    token_id: number;
    price: string;
    seller: string;
    total_price: string;
}

//   "item_id": 4,
//   "token_id": 4,
//   "price": "99",
//   "listing_price": "99",
//   "seller": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
//   "is_sold": false,
//   "total_price": "99.99",
//   "image": "https://roma-mkp.infura-ipfs.io/ipfs/QmbngppuW5cYckoEHfHeURyJ1ULNuiyp4VLgDsVdSkqhsW",
//   "name": "Hippy cat",
//   "description": "This cat lost",
//   "owner": "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
