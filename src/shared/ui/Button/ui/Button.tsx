import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import classes from './Button.module.scss';
import { cn } from 'shared/lib/classNames';

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
