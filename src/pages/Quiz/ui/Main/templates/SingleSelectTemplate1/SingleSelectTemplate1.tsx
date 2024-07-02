import { Typography } from 'shared/ui/Typography';
import { Card } from 'shared/ui/Card';
import classes from './SingleSelectTemplate1.module.scss';
import { useTranslation } from 'react-i18next';
import { Questions } from 'pages/Quiz/ui/Main/Main.tsx';
import { useEffect, useState } from 'react';
import { useButtonDisabled } from 'pages/Quiz/lib/hooks/useDisabledButton.tsx';
import { getLocalStorage, setLocalStorage } from 'pages/Quiz/lib/helpers/localStorage.ts';

interface SingleSelectTemplate1Props {
    questions: Questions;
    questionId: string;
}

const SingleSelectTemplate1 = (props: SingleSelectTemplate1Props) => {
    const { questions, questionId } = props;
    const { t } = useTranslation();

    const [activeQuestion, setActiveQuestion] = useState<null | string>(() => {
        const initData = getLocalStorage(questionId);

        if (initData !== undefined && !Array.isArray(initData)) {
            return initData;
        }

        return null;
    });

    useEffect(() => {
        setLocalStorage(questionId, activeQuestion);

        if (activeQuestion === null) {
            useButtonDisabled.setState({ isDisabled: true });
        } else {
            useButtonDisabled.setState({ isDisabled: false });
        }
    }, [activeQuestion, questionId]);

    return (
        <>
            {questions.map(({ translateKey, id }) => (
                <Card
                    key={id}
                    active={activeQuestion === id}
                    className={classes.spacing}
                    cursorPointer
                    onClick={() => setActiveQuestion(id)}
                >
                    <Typography variant="body1" fontSize={3} fontWeight="500">
                        {t(translateKey)}
                    </Typography>
                </Card>
            ))}
        </>
    );
};

export default SingleSelectTemplate1;
