import Header from 'pages/Quiz/ui/Header/Header.tsx';
import Main, { Questions } from 'pages/Quiz/ui/Main/Main.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dataJson from '../../../../../mock/data.json';
import Footer from 'pages/Quiz/ui/Footer/Footer.tsx';
import { useLocalStorageQuiz } from 'pages/Quiz/lib/hooks/useLocalStorageQuiz.ts';
import i18 from 'shared/config/i18';

type QuizType =
    | 'single-select__template-1'
    | 'single-select__template-2'
    | 'multiple-select__template'
    | 'bubble-template';

export interface QuizResponse {
    id: string;
    type: QuizType;
    title: string;
    subtitle: string | null;
    questions: Questions;
}

const Quiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const quizId = +id!;
    const quizIndex = quizId - 1;

    const { data } = useQuery<QuizResponse[]>({
        queryKey: ['quiz'],
        initialData: () => {
            return dataJson as QuizResponse[];
        },
    });

    const isStart = data[quizIndex - 1] === undefined;
    const currentQuiz = data[quizIndex];
    const isEnd = data[quizIndex + 1] === undefined;

    const onBack = () => {
        if (isStart) {
            return;
        }

        navigate(-1);
    };

    const onNext = async () => {
        if (isEnd) {
            return;
        }

        if (currentQuiz.title === 'language_question') {
            const answerId = useLocalStorageQuiz.getState().getLocalStorage(currentQuiz.id);
            const answer = currentQuiz.questions.find(({ id }) => id === answerId);

            if (answer) {
                await i18.changeLanguage(answer.translateKey);
            }
        }

        navigate(`/quiz/${quizId + 1}`);
    };

    return (
        <>
            <Header isShowBack={!isStart} onBack={onBack} value={quizId} maxValue={data.length} />
            <Main data={currentQuiz} />
            <Footer onNext={onNext} />
        </>
    );
};

export default Quiz;
