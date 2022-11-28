import cn from 'classnames';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useDapp } from '@/providers/DappContext';
import { useUser } from '@/providers/UserProvider/UserContext';
import { MarketplaceItemDto } from '@/types/nft.type';

import styles from './Card.module.scss';

type Props = {
    item: MarketplaceItemDto;
    cb?: () => void;
};

const Card: React.FC<Props> = ({ item, cb }) => {
    const { user } = useUser();
    const { wallet, web3Handler, Mkp } = useDapp();
    const router = useRouter();
    return (
        <div className={styles.nft}>
            <div className={cn(styles.main, 'flex mx-auto')}>
                <Image
                    alt="NFT"
                    className={cn(styles.tokenImage)}
                    height={400}
                    priority={true}
                    quality={50}
                    src={item.image}
                    width={400}
                />
                <h2>{item.name}</h2>
                <p className={cn(styles.description, 'min-h-[75px]')}>
                    {item.description}
                </p>
                <div className={cn(styles.tokenInfo, 'pb-3 gap-x-3')}>
                    <div className={styles.price}>
                        <ins>◘</ins>
                        <p>{item.price} ETH</p>
                    </div>
                    {user?.token ? (
                        <button
                            className={styles.buyBtn}
                            onClick={async () => {
                                if (!wallet) {
                                    web3Handler();
                                }
                                if (wallet && user?.token) {
                                    console.log(item.item_id);
                                    await Mkp.buyItem(
                                        item.item_id,
                                        item.total_price,
                                    );
                                    cb && cb();
                                }
                            }}
                            type={'button'}
                        >
                            Buy Now
                        </button>
                    ) : (
                        <button
                            className={styles.buyBtn}
                            onClick={() => {
                                router.push('/login');
                            }}
                            type={'button'}
                        >
                            Login
                        </button>
                    )}
                    {/*<div className={styles.duration}>*/}
                    {/*    <ins>◷</ins>*/}
                    {/*    <p>11 days left</p>*/}
                    {/*</div>*/}
                </div>
                <hr />
                <div className={cn(styles.creator, 'mx-auto')}>
                    <div className={cn(styles.wrapper)}>
                        <img
                            alt="Creator"
                            src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                        />
                    </div>
                    <p>
                        <ins>Creation of </ins>
                        Roma
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Card;
