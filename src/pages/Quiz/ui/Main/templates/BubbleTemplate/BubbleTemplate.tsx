import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Card } from 'shared/ui/Card';
import classes from './BubbleTemplate.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Questions } from 'pages/Quiz/ui/Main/Main.tsx';
import { useButtonDisabled } from 'pages/Quiz/lib/hooks/useDisabledButton.tsx';
import { getLocalStorage, setLocalStorage } from 'pages/Quiz/lib/helpers/localStorage.ts';

interface MultipleSelectTemplate1Props {
    questions: Questions;
    questionId: string;
}

const BubbleTemplate = (props: MultipleSelectTemplate1Props) => {
    const { questions, questionId } = props;
    const { t } = useTranslation();

    const [activeQuestions, setActiveQuestions] = useState<string[]>(() => {
        const initData = getLocalStorage(questionId);

        if (Array.isArray(initData)) {
            return initData;
        }

        return [];
    });

    useEffect(() => {
        setLocalStorage(questionId, activeQuestions);

        if (activeQuestions.length === 0) {
            useButtonDisabled.setState({ isDisabled: true });
        } else {
            useButtonDisabled.setState({ isDisabled: false });
        }
    }, [activeQuestions]);

    return (
        <div className={classes.root}>
            {questions.map(({ translateKey, img, id }) => {
                const active = activeQuestions.includes(id);

                const onCardClick = () => {
                    setActiveQuestions(
                        activeQuestions.includes(id)
                            ? activeQuestions.filter((_id) => _id !== id)
                            : [...activeQuestions, id],
                    );
                };

                return (
                    <Card
                        key={translateKey}
                        active={active}
                        className={classes.card}
                        cursorPointer
                        variant="circle"
                        onClick={onCardClick}
                    >
                        <img src={img} alt={t(translateKey)} />
                        <Typography variant="body1" fontSize={6} fontWeight="600">
                            {t(translateKey)}
                        </Typography>
                    </Card>
                );
            })}
        </div>
    );
};

export default BubbleTemplate;
