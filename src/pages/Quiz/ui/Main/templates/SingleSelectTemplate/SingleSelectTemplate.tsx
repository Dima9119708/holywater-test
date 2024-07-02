import { Typography } from 'shared/ui/Typography';
import { Card } from 'shared/ui/Card';
import classes from './SingleSelectTemplate.module.scss';
import { useTranslation } from 'react-i18next';
import { TemplateProps } from 'pages/Quiz/types/types.ts';
import { useTemplate } from 'pages/Quiz/lib/hooks/useTemplate.ts';

const SingleSelectTemplate = (props: TemplateProps) => {
    const { question } = props;
    const { t } = useTranslation();

    const { onSingleSelect, isActive } = useTemplate(question);

    return (
        <>
            {question.answers.map((answer) => {
                const { translateKey, id } = answer;
                const active = isActive(id);

                return (
                    <Card
                        key={id}
                        active={active}
                        className={classes.spacing}
                        cursorPointer
                        onClick={onSingleSelect(answer)}
                    >
                        <Typography variant="body1" fontSize={3} fontWeight="500">
                            {t(translateKey)}
                        </Typography>
                    </Card>
                );
            })}
        </>
    );
};

export default SingleSelectTemplate;
