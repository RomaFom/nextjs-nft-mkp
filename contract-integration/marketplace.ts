import { ethers } from 'ethers';
import { MarketplaceItemDto } from '@/types/nft.type';

export class Marketplace {
    contract: ethers.Contract;
    constructor(contract: ethers.Contract) {
        this.contract = contract;
    }

    async getItemsCount(): Promise<number> {
        const count = await this.contract.itemCount();
        return count.toNumber();
    }

    async items(index: number): Promise<MarketplaceItemDto> {
        return await this.contract.items(index);
    }

    async getFinalPrice(itemId: ethers.BigNumber): Promise<ethers.BigNumber> {
        return await this.contract.getFinalPrice(itemId);
    }

    async buyItem(
        itemId: number,
        price: string,
    ): Promise<ethers.ContractReceipt | null> {
        try {
            const toWei = ethers.utils.parseEther(price);
            return await (
                await this.contract.buyItem(itemId, {
                    value: toWei,
                    gasLimit: 1000000,
                })
            ).wait();
        } catch (error) {
            return null;
        }
    }

    async listItem(
        itemId: number,
        price: string,
    ): Promise<ethers.ContractReceipt | null> {
        try {
            const toWei = ethers.utils.parseEther(price);
            return await (
                await this.contract.listItem(itemId, toWei, {
                    gasLimit: 1000000,
                })
            ).wait();
        } catch (error) {
            console.log('error', error);
            return null;
        }
    }

    //   const totalPrice = await marketplaceContract?.getFinalPrice(
    //             item.itemId
    //           );
}
