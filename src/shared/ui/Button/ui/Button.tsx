import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from 'shared/lib/classNames';

import classes from './Button.module.scss';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    const { children, disabled, ...otherProps } = props;

    return (
        <button
            {...otherProps}
            disabled={disabled}
            className={cn(
                classes.reset,
                classes.base,
                classes.primary,
                disabled && classes.disabled,
                props.className,
            )}
        >
            {children}
        </button>
    );
};

export default Button;
