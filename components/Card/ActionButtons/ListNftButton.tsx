import axios from 'axios';
import React, { useCallback, useState } from 'react';
import Button from '@/components/Button/Button';
import { useDapp } from '@/providers/DappContext';
import { MarketplaceItemDto } from '@/types/nft.type';

interface Props {
    item: MarketplaceItemDto;
    cb: () => Promise<void>;
}
const ListNftButton: React.FC<Props> = ({ item, cb }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { Mkp } = useDapp();
    const handleClick = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await Mkp.listItem(item.nft.nft_id, item.price);
            if (!res) {
                return;
            }
            await axios.post('api/transaction/send', {
                tx_hash: res?.transactionHash,
                item_id: item.item_id,
                nft_id: item.token_id,
            });
            await cb();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    return (
        <>
            <Button
                buttonStyle={'buy'}
                onClick={handleClick}
                showLoader={isLoading}
                type={'button'}
            >
                List NFT
            </Button>
        </>
    );
};
export default ListNftButton;
