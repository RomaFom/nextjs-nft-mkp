import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import Button from '@/components/Button/Button';
import { useDapp } from '@/providers/DappContext';
import { useUser } from '@/providers/UserProvider/UserContext';
import { MarketplaceItemDto } from '@/types/nft.type';

interface Props {
    item: MarketplaceItemDto;
    cb: () => Promise<void>;
}
const BuyNftButton: React.FC<Props> = ({ item, cb }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const { wallet, web3Handler, Mkp } = useDapp();
    const router = useRouter();

    const handleClick = useCallback(async () => {
        try {
            setIsLoading(true);
            if (!wallet) {
                return await web3Handler();
            }
            if (!user?.token) {
                return router.push('/login');
            }
            if (wallet && user?.token) {
                const res = await Mkp.buyItem(item.item_id, item.total_price);
                if (!res) {
                    return;
                }
                await axios.post('api/transaction/send', {
                    tx_hash: res?.transactionHash,
                    item_id: item.item_id,
                    nft_id: item.token_id,
                });
                await cb();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [wallet, web3Handler, Mkp]);

    return (
        <>
            <Button
                buttonStyle={'buy'}
                onClick={handleClick}
                showLoader={isLoading}
                type={'button'}
            >
                {user?.token ? 'Buy Now' : 'Login'}
            </Button>
        </>
    );
};
export default BuyNftButton;
