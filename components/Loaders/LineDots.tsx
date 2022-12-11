import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

type Props = {
    width: number;
    height: number;
};
export const LineDots: React.FC<Props> = ({ width, height }) => (
    <ThreeDots
        ariaLabel="three-dots-loading"
        color="#4fa94d"
        height={height}
        radius="9"
        visible={true}
        width={width}
        wrapperStyle={{}}
    />
);
