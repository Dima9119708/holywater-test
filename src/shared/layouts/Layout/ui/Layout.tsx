import classes from './Layout.module.scss';
import { ReactNode } from 'react';
import { cn } from 'shared/lib/classNames';

interface LayoutProps {
    children?: ReactNode;
    gridTemplateRows?: string;
    className?: string;
}

const Layout = (props: LayoutProps) => {
    const { children, className, gridTemplateRows } = props;

    return (
        <div className={cn(classes.root, className)} style={{ gridTemplateRows }}>
            {children}
        </div>
    );
};

export default Layout;
