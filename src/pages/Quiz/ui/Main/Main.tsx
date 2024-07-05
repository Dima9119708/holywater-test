import SingleSelectTemplate from 'pages/Quiz/ui/Main/templates/SingleSelectTemplate/SingleSelectTemplate.tsx';
import classes from './Main.module.scss';
import MainTitle from 'pages/Quiz/ui/Main/MainTitle/MainTitle.tsx';
import SingleSelectImageTemplate from 'pages/Quiz/ui/Main/templates/SingleSelectImageTemplate/SingleSelectImageTemplate.tsx';
import MultipleSelectTemplate from 'pages/Quiz/ui/Main/templates/MultipleSelectTemplate/MultipleSelectTemplate.tsx';
import BubbleTemplate from 'pages/Quiz/ui/Main/templates/BubbleTemplate/BubbleTemplate.tsx';

import type { MainProps } from 'pages/Quiz/types/types.ts';

const Main = (props: MainProps) => {
    const { question } = props;

    return (
        <div className={classes.main}>
            <MainTitle title={question.title} subtitle={question.subtitle} />
            {question.type === 'single-select' && <SingleSelectTemplate question={question} />}
            {question.type === 'single-select-image' && (
                <SingleSelectImageTemplate question={question} />
            )}
            {question.type === 'multiple-select' && <MultipleSelectTemplate question={question} />}
            {question.type === 'bubble' && <BubbleTemplate question={question} />}
        </div>
    );
};

export default Main;
