import { create } from 'zustand';

interface UseLocalStorageQuiz {
    getLocalStorage: (questionId: string) => null | string | string[];
    setLocalStorage: (questionId: string, answersIds: string | string[] | null) => void;
}

export const useLocalStorageQuiz = create<UseLocalStorageQuiz>(() => ({
    getLocalStorage: (questionId) => {
        const localStorageData = localStorage.getItem('quiz');

        return localStorageData ? JSON.parse(localStorageData)[questionId] : null;
    },
    setLocalStorage: (questionId, answersIds) => {
        const localStorageData = localStorage.getItem('quiz');

        if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);

            if (answersIds === null) {
                delete parsedData[questionId];

                localStorage.setItem('quiz', JSON.stringify(parsedData));
            } else {
                localStorage.setItem(
                    'quiz',
                    JSON.stringify({ ...JSON.parse(localStorageData), [questionId]: answersIds }),
                );
            }
        } else {
            localStorage.setItem('quiz', JSON.stringify({ [questionId]: answersIds }));
        }
    },
}));
