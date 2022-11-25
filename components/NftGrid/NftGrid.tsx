import React from 'react';

import styles from './NftGrid.module.scss';
type Props = {
    children: React.ReactNode;
};
const NftGrid: React.FC<Props> = ({ children }) => (
    <div className={styles.nftGrid}>{children}</div>
);
export { NftGrid };
