import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Card } from 'shared/ui/Card';
import classes from './MultipleSelectTemplate.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Questions } from 'pages/Quiz/ui/Main/Main.tsx';
import { Checkbox } from 'shared/ui/Checkbox';
import { useButtonDisabled } from 'pages/Quiz/lib/hooks/useDisabledButton.tsx';
import { getLocalStorage, setLocalStorage } from 'pages/Quiz/lib/helpers/localStorage.ts';

interface MultipleSelectTemplate1Props {
    questions: Questions;
    questionId: string;
}

const MultipleSelectTemplate = (props: MultipleSelectTemplate1Props) => {
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
        <>
            {questions.map(({ translateKey, id }) => {
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
                        onClick={onCardClick}
                    >
                        <Typography variant="body1" fontSize={3} fontWeight="500">
                            {t(translateKey)}
                        </Typography>
                        <Checkbox checked={active} />
                    </Card>
                );
            })}
        </>
    );
};

export default MultipleSelectTemplate;
