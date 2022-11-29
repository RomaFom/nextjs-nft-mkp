import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import Button from '@/components/Button/Button';
import { useDapp } from '@/providers/DappContext';
import { useUser } from '@/providers/UserProvider/UserContext';
import { MarketplaceItemDto } from '@/types/nft.type';

interface Props {
    item: MarketplaceItemDto;
    cb?: () => void;
}
const BuyNftButton: React.FC<Props> = ({ item, cb }) => {
    const { user } = useUser();
    const { wallet, web3Handler, Mkp } = useDapp();
    const router = useRouter();

    const handleClick = useCallback(async () => {
        if (!wallet) {
            return await web3Handler();
        }
        if (!user?.token) {
            return router.push('/login');
        }
        if (wallet && user?.token) {
            const res = await Mkp.buyItem(item.item_id, item.total_price);
            await axios.post(
                'api/transaction/buy',
                {
                    tx_hash: res?.transactionHash,
                    item_id: item.item_id,
                    nft_id: item.token_id,
                    wallet: wallet,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                },
            );
            cb && (await cb());
        }
    }, [wallet, web3Handler, Mkp]);

    return (
        <>
            <Button buttonStyle={'buy'} onClick={handleClick} type={'button'}>
                {user?.token ? 'Buy Now' : 'Login'}
            </Button>
        </>
    );
};
export default BuyNftButton;
