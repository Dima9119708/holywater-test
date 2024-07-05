import type { PropsWithChildren } from 'react';
import React from 'react';

import { cn } from 'shared/lib/classNames';

import classes from './Card.module.scss';

interface CardProps {
    variant?: 'vertical' | 'horizontal' | 'circle';
    active?: boolean;
    className?: string;
    cursorPointer?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Card = (props: PropsWithChildren<CardProps>) => {
    const { variant = 'horizontal', children, active, className, onClick, cursorPointer } = props;

    return (
        <div
            onClick={onClick}
            className={cn(
                classes.card_base,
                classes[`card_${variant}`],
                active && classes.card_active,
                cursorPointer && classes['card_cursor-pointer'],
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Card;
