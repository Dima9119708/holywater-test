import type { Answers, QuizResponse } from 'pages/Quiz';
import { LOCAL_STORAGE_KEY } from 'shared/const';

export type LocalStorageValue = {
    type: QuizResponse['type'];
    title: QuizResponse['title'];
    answers: Answers;
};

export type LocalStorageData =
    | Record<string, LocalStorageValue>
    | Record<
          string,
          Omit<LocalStorageValue, 'answers'> & { answers: Omit<Answers[number], 'img' | 'id'>[] }
      >;

export const getLocalStorage = <ID extends keyof LocalStorageData | null>(
    questionId?: ID,
): (ID extends null ? LocalStorageData : LocalStorageValue) | null => {
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (localStorageData && questionId) {
        const parsedData = JSON.parse(localStorageData);

        return parsedData[questionId];
    }

    if (localStorageData) {
        return JSON.parse(localStorageData);
    }

    return null;
};

export const setLocalStorage = (data: LocalStorageData) => {
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (localStorageData) {
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({ ...JSON.parse(localStorageData), ...data }),
        );
    } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
};
