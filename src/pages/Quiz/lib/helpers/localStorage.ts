export const getLocalStorage = (questionId: string): string | string[] | null => {
    const localStorageData = localStorage.getItem('quiz');

    return localStorageData ? JSON.parse(localStorageData)[questionId] : null;
};

export const setLocalStorage = (questionId: string, answersIds: string | string[] | null) => {
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
};
