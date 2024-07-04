import Header from 'pages/Quiz/ui/Header/Header.tsx';
import Main from 'pages/Quiz/ui/Main/Main.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dataJson from '../../../../../mock/data.json';
import Footer from 'pages/Quiz/ui/Footer/Footer.tsx';
import i18 from 'shared/config/i18';
import { getLocalStorage } from 'shared/lib/helpers/localStorage.ts';
import { QuizResponse } from 'pages/Quiz';
import { RoutersPath } from 'shared/const/routers.ts';
import { LANGUAGE_QUESTION_KEY } from 'shared/const';
import { Layout } from 'shared/layouts/Layout';
import classes from './Quiz.module.scss';

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
            navigate(RoutersPath.LOADER);
            return;
        }

        if (currentQuiz.title === LANGUAGE_QUESTION_KEY) {
            const answerId = getLocalStorage(currentQuiz.id)?.answers[0].id;
            const answer = currentQuiz.answers.find(({ id }) => id === answerId);

            if (answer) {
                await i18.changeLanguage(answer.translateKey);
            }
        }

        navigate(`${RoutersPath.QUIZ}${quizId + 1}`);
    };

    return (
        <Layout className={classes.layout}>
            <Header
                isShowButtonBack={!isStart}
                onBack={onBack}
                valueProgress={quizId}
                maxValueProgress={data.length}
            />
            <Main question={currentQuiz} />
            <Footer onNext={onNext} />
        </Layout>
    );
};

export default Quiz;
