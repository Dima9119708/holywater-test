import classes from './Loader.module.scss';
import {
    CircularProgressWithLabel,
    useCircularProgressInterval,
} from 'shared/ui/CircularProgressWithLabel';
import { Typography } from 'shared/ui/Typography';
import { useTranslation } from 'react-i18next';

const Loader = () => {
    const { t } = useTranslation();

    const progress = useCircularProgressInterval({
        time: 5000,
        step: 5,
        onEndAnimation: () => {
            console.log('caall =>');
        },
    });

    return (
        <>
            <div />
            <div className={classes.root}>
                <CircularProgressWithLabel {...progress} />
                <Typography
                    className={classes.text}
                    variant="body1"
                    color="03"
                    fontWeight="600"
                    font="secondary"
                >
                    {t('finding_collections_for_you')}
                </Typography>
            </div>
            <div />
        </>
    );
};

export default Loader;
