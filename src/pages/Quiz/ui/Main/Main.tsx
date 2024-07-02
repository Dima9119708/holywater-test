import SingleSelectTemplate1 from 'pages/Quiz/ui/Main/templates/SingleSelectTemplate1/SingleSelectTemplate1.tsx';
import classes from './Main.module.scss';
import MainTitle from 'pages/Quiz/ui/Main/MainTitle/MainTitle.tsx';
import SingleSelectTemplate2 from 'pages/Quiz/ui/Main/templates/SingleSelectTemplate2/SingleSelectTemplate2.tsx';
import MultipleSelectTemplate from 'pages/Quiz/ui/Main/templates/MultipleSelectTemplate/MultipleSelectTemplate.tsx';
import BubbleTemplate from 'pages/Quiz/ui/Main/templates/BubbleTemplate/BubbleTemplate.tsx';
import { QuizResponse } from 'pages/Quiz/ui/Quiz/Quiz.tsx';

interface MainProps {
    data: QuizResponse;
}

export type Questions = { id: string; translateKey: string; img?: string }[];

const Main = (props: MainProps) => {
    const { data } = props;

    return (
        <div className={classes.main}>
            <MainTitle title={data.title} subtitle={data.subtitle} />
            {data.type === 'single-select__template-1' && (
                <SingleSelectTemplate1 questionId={data.id} questions={data.questions} />
            )}
            {data.type === 'single-select__template-2' && (
                <SingleSelectTemplate2 questionId={data.id} questions={data.questions} />
            )}
            {data.type === 'multiple-select__template' && (
                <MultipleSelectTemplate questionId={data.id} questions={data.questions} />
            )}
            {data.type === 'bubble-template' && (
                <BubbleTemplate questionId={data.id} questions={data.questions} />
            )}
        </div>
    );
};

export default Main;
