import { Outlet } from 'react-router-dom';

import classes from './RootLayout.module.scss';

const RootLayout = () => {
    return (
        <div className={classes.root} id="root-layout">
            <Outlet />
        </div>
    );
};

export default RootLayout;
