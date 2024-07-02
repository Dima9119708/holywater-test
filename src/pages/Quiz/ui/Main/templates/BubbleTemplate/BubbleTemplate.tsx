import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card';
import classes from './BubbleTemplate.module.scss';
import { Typography } from 'shared/ui/Typography';
import { TemplateProps } from 'pages/Quiz/types/types.ts';
import { useTemplate } from 'pages/Quiz/lib/hooks/useTemplate.ts';

const BubbleTemplate = (props: TemplateProps) => {
    const { question } = props;
    const { t } = useTranslation();

    const { onMultiSelect, isActive } = useTemplate(question);

    return (
        <div className={classes.root}>
            {question.answers.map((answer) => {
                const { translateKey, img, id } = answer;
                const active = isActive(id);

                return (
                    <Card
                        key={translateKey}
                        active={active}
                        className={classes.card}
                        cursorPointer
                        variant="circle"
                        onClick={onMultiSelect(answer)}
                    >
                        <img src={img} alt={t(translateKey)} />
                        <Typography variant="body1" fontSize={6} fontWeight="600">
                            {t(translateKey)}
                        </Typography>
                    </Card>
                );
            })}
        </div>
    );
};

export default BubbleTemplate;
