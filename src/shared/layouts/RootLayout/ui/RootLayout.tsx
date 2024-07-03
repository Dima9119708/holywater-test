import classes from './RootLayout.module.scss';
import { cn } from 'shared/lib/classNames';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className={cn('theme-default', classes.root)} id="root-layout">
            <Outlet />
        </div>
    );
};

export default RootLayout;
