import { useMemo } from 'react';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import CheckIcon from 'shared/assets/images/checkmark.component.svg';
import DownloadIcon from 'shared/assets/images/download.component.svg';
import { RoutersPath } from 'shared/const/routers.ts';
import { Layout } from 'shared/layouts/Layout';
import { getLocalStorage } from 'shared/lib/helpers/localStorage.ts';
import { Button } from 'shared/ui/Button';
import { Typography } from 'shared/ui/Typography';

import classes from './ThankYou.module.scss';

const regexRemoveTagsInTranslate = /<\/?[^>]+(>|$)/g;

const ThankYou = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const csvData = useMemo(() => {
        const localStorageData = getLocalStorage(null);

        if (!localStorageData) return [];

        const csvFormattedData = Object.values(localStorageData).reduce<string[][]>(
            (acc, currentValue, idx) => {
                acc.push([
                    `${idx + 1}`,
                    t(currentValue.title).replace(regexRemoveTagsInTranslate, ''),
                    currentValue.type,
                    currentValue.answers
                        .reduce((_acc, answer) => {
                            return `${_acc} ${t(answer.translateKey).replace(regexRemoveTagsInTranslate, '')}`;
                        }, '')
                        .trim(),
                ]);

                return acc;
            },
            [],
        );

        csvFormattedData.unshift([t('order'), t('title'), t('type'), t('answer')]);

        return csvFormattedData;
    }, [t]);

    const onRetake = () => {
        localStorage.removeItem('quiz');
        navigate(RoutersPath.START_QUIZ);
    };

    return (
        <Layout className={classes.layout}>
            <div className={classes.block_head}>
                <Typography variant="h1" fontWeight="400" font="tertiary" fontSize={8}>
                    {t('thank_you_message')}
                </Typography>
                <Typography className={classes.subtitle} variant="subtitle1" color="09">
                    {t('support_quiz_message')}
                </Typography>

                <div className={classes.icon}>
                    <CheckIcon />
                </div>
            </div>
            <div>
                <CSVLink className={classes.block_download} data={csvData} filename={t('quiz')}>
                    <DownloadIcon />
                    <Typography variant="body1" font="secondary" fontWeight="600" fontSize={3}>
                        {t('download_answers_message')}
                    </Typography>
                </CSVLink>

                <Button type="button" className="w-full" onClick={onRetake}>
                    {t('retake_quiz_message')}
                </Button>
            </div>
        </Layout>
    );
};

export default ThankYou;
