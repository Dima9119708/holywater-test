import { InputHTMLAttributes, useEffect, useState } from 'react';
import classes from './Checkbox.module.scss';
import { cn } from 'shared/lib/classNames';
import IconCheck from '../icon/check.component.svg';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string;
    onChange?: (checked: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, ...otherProps } = props;

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const _onChange = () => {
        setIsChecked(!isChecked);
        if (onChange) {
            onChange(!isChecked);
        }
    };

    return (
        <div
            role="checkbox"
            aria-checked={isChecked}
            tabIndex={0}
            className={cn(
                classes.base,
                !isChecked && classes.unchecked,
                isChecked && classes.checked,
                props.className,
            )}
            onClick={_onChange}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    _onChange();
                }
            }}
            {...otherProps}
        >
            {isChecked && <IconCheck />}
        </div>
    );
};

export default Checkbox;
