import { useCallback, useEffect, useState } from 'react';
import { Answers, QuizResponse } from 'pages/Quiz/types/types.ts';
import { useButtonDisabled } from 'pages/Quiz/lib/hooks/useDisabledButton.tsx';
import { getLocalStorage, setLocalStorage } from 'shared/lib/helpers/localStorage.ts';

export const useTemplate = (question: QuizResponse) => {
    const [answers, setAnswers] = useState<Answers>(
        () => getLocalStorage(question.id)?.answers || [],
    );

    const isActive = useCallback(
        (id: string) => answers.some((answer) => answer.id === id),
        [answers],
    );

    const onMultiSelect = useCallback(
        (answer: Answers[number]) => () => {
            const isExist = isActive(answer.id);

            setAnswers(
                isExist
                    ? answers.filter((_answer) => _answer.id !== answer.id)
                    : [...answers, answer],
            );
        },
        [answers],
    );

    const onSingleSelect = useCallback(
        (answer: Answers[0]) => () => {
            setAnswers([answer]);
        },
        [],
    );

    useEffect(() => {
        setLocalStorage({
            [question.id]: {
                type: question.type,
                title: question.title,
                answers: answers,
            },
        });

        if (answers.length === 0) {
            useButtonDisabled.setState({ isDisabled: true });
        } else {
            useButtonDisabled.setState({ isDisabled: false });
        }
    }, [answers]);

    return {
        answers,
        setAnswers,
        isActive,
        onMultiSelect,
        onSingleSelect,
    };
};
