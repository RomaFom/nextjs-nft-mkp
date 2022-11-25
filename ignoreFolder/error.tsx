'use client';

import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
    }, [error]);

    return (
        <div>
            <p>Something went wrong!</p>
            <button onClick={() => reset()} type={'button'}>
                Reset error boundary
            </button>
        </div>
    );
}
