import classes from './RootLayout.module.scss';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className={classes.root} id="root-layout">
            <Outlet />
        </div>
    );
};

export default RootLayout;
