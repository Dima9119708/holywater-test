import { Trans, useTranslation } from 'react-i18next';

import { Typography } from 'shared/ui/Typography';

import classes from './MainTitle.module.scss';

interface TitleProps {
    title: string;
    subtitle: string | null;
}

const MainTitle = (props: TitleProps) => {
    const { subtitle, title } = props;

    const { t } = useTranslation();

    return (
        <>
            <Typography variant="h1" fontSize={2} className={classes.title} fontWeight="700">
                <Trans
                    i18nKey={t(title)}
                    components={{
                        text_highlight: <span className={classes.text_highlight} />,
                    }}
                />
            </Typography>
            {subtitle && (
                <Typography
                    variant="subtitle1"
                    fontSize={3}
                    color="04"
                    className={classes.subtitle}
                >
                    {t(subtitle)}
                </Typography>
            )}
        </>
    );
};

export default MainTitle;
