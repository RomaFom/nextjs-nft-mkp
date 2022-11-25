import { ethers } from 'ethers';

export const bigEther = (value: number): ethers.BigNumber =>
    ethers.utils.parseUnits(value.toString(), 'ether');
