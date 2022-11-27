import React from 'react';
import { Bars } from 'react-loader-spinner';

export const BarLoader: React.FC = () => (
    <div className={'flex justify-center'}>
        <Bars
            ariaLabel="bars-loading"
            color="#4fa94d"
            height="80"
            visible={true}
            width="80"
            wrapperClass=""
            wrapperStyle={{}}
        />
    </div>
);
