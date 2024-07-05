import type { InputHTMLAttributes } from 'react';
import { cn } from 'shared/lib/classNames';
import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    classNameInput?: string;
}

const Input = (props: InputProps) => {
    return (
        <div className={props.className}>
            <input
                {...props}
                className={cn(
                    classes.reset,
                    classes.base,
                    classes.primary,
                    props.error && classes.error,
                    props.classNameInput,
                )}
            />
            <div className={classes.error_message}>{props.error}</div>
        </div>
    );
};

export default Input;
