import React from 'react';
import { Puff } from 'react-loader-spinner';

export const PuffLoader: React.FC = () => (
    <>
        <Puff
            ariaLabel="puff-loading"
            color="#4fa94d"
            height="20"
            radius={1}
            visible={true}
            width="20"
            wrapperClass=""
            wrapperStyle={{}}
        />
    </>
);
