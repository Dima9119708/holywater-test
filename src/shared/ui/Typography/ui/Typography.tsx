import type { PropsWithChildren } from 'react';
import { createElement } from 'react';

import { cn } from 'shared/lib/classNames';

import classes from './Typography.module.scss';

interface TypographyProps {
    className?: string;
    variant: 'h1' | 'subtitle1' | 'body1';
    font?: 'primary' | 'secondary' | 'tertiary';
    fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    color?: `${number}`;
    fontSize?: number;
}

const variantMapping: Record<TypographyProps['variant'], string> = {
    h1: 'h1',
    subtitle1: 'h6',
    body1: 'span',
};

const Typography = (props: PropsWithChildren<TypographyProps>) => {
    const {
        variant,
        children,
        font = 'primary',
        fontWeight = '400',
        color = '03',
        fontSize = 3,
    } = props;

    return createElement(
        variantMapping[variant],
        {
            className: cn(
                props.className,
                classes[variant],
                classes[`font_${font}`],
                `font-weight_${fontWeight}`,
                `color-${color}`,
                `font-size_${fontSize}`,
            ),
        },
        children,
    );
};

export default Typography;
