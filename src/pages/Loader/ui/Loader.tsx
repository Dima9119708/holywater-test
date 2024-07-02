import classes from './Loader.module.scss';
import {
    CircularProgressWithLabel,
    useCircularProgressInterval,
} from 'shared/ui/CircularProgressWithLabel';
import { Typography } from 'shared/ui/Typography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutersPath } from 'shared/const/routers.ts';
import { Layout } from 'shared/layouts/Layout';

const Loader = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const progress = useCircularProgressInterval({
        time: 5000,
        step: 10,
        onEndAnimation: () => {
            navigate(RoutersPath.EMAIL);
        },
    });

    return (
        <Layout gridTemplateRows="1fr">
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
        </Layout>
    );
};

export default Loader;
