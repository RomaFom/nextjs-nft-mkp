import React, { memo } from 'react';
import { Oval } from 'react-loader-spinner';

type Props = {
    width: number;
    height: number;
};
export const Circle: React.FC<Props> = memo(({ width, height }) => (
    <Oval
        ariaLabel="oval-loading"
        color="#4fa94d"
        height={height}
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
        visible={true}
        width={width}
        wrapperClass=""
        wrapperStyle={{}}
    />
));
