import cn from 'classnames';

import Image from 'next/image';
import React from 'react';
import { MarketplaceItemDto } from '@/types/nft.type';

import styles from './Card.module.scss';

type Props = {
    item: MarketplaceItemDto;
    actionButton?: React.ReactNode;
};

const Card: React.FC<Props> = ({ item, actionButton }) => (
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
                {actionButton}
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
export default Card;
