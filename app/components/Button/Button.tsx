'use client';
import React from 'react';

import styles from './Button.module.scss';
type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type: 'button' | 'submit' | 'reset';
    className?: string;
};
const Button: React.FC<Props> = ({
    children,
    disabled,
    onClick,
    type = 'button',
    className,
}) => (
    <span className={styles.appBtn}>
        <button
            className={className}
            disabled={disabled}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
            type={type}
        >
            {children}
        </button>
    </span>
);
export default Button;
