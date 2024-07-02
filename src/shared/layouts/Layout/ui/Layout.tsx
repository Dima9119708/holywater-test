import classes from './Layout.module.scss';
import { ReactNode } from 'react';

interface LayoutProps {
    children?: ReactNode;
    gridTemplateRows?: string;
}

const Layout = (props: LayoutProps) => {
    const { children, gridTemplateRows } = props;

    return (
        <div className={classes.root} style={{ gridTemplateRows }}>
            {children}
        </div>
    );
};

export default Layout;
