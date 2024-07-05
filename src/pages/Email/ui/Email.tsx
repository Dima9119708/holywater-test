import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RoutersPath } from 'shared/const/routers.ts';
import { Layout } from 'shared/layouts/Layout';
import { cn } from 'shared/lib/classNames';
import { setLocalStorage } from 'shared/lib/helpers/localStorage.ts';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Typography } from 'shared/ui/Typography';

import classes from './Email.module.scss';

const Email = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(event.target.value)) {
            setIsDisabled(false);
            setError(false);
        } else {
            setIsDisabled(true);
            setError(true);
        }

        setValue(event.target.value);
    };

    const onNext = () => {
        setLocalStorage({
            email: {
                type: 'email',
                title: 'email',
                answers: [
                    {
                        translateKey: value,
                    },
                ],
            },
        });
        navigate(RoutersPath.THANK_YOU);
    };

    return (
        <Layout className={classes.layout}>
            <div>
                <Typography
                    className={classes.title}
                    variant="h1"
                    fontWeight="800"
                    fontSize={5}
                    font="secondary"
                >
                    {t('email')}
                </Typography>
                <Typography
                    className={classes.subtitle}
                    variant="subtitle1"
                    fontWeight="500"
                    fontSize={4}
                    color="04"
                    font="secondary"
                >
                    {t('enter_email_access')}
                </Typography>

                <Input
                    className={classes.input}
                    value={value}
                    onChange={onChangeInput}
                    error={error ? t('invalid_email') : undefined}
                    placeholder={t('email')}
                />
                <Typography
                    className={classes.block_text}
                    variant="body1"
                    color="03"
                    font="secondary"
                >
                    <Trans
                        i18nKey="agree_privacy_terms"
                        components={{
                            PrivacyPolicy: <span className={classes.text_highlight} />,
                            TermsOfUse: (
                                <span
                                    className={cn(classes.text_highlight, classes.terms_of_use)}
                                />
                            ),
                        }}
                    ></Trans>
                </Typography>
            </div>
            <div>
                <Button type="button" disabled={isDisabled} className="w-full" onClick={onNext}>
                    {t('next')}
                </Button>
            </div>
        </Layout>
    );
};

export default Email;
