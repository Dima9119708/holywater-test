import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card';
import classes from './MultipleSelectTemplate.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Checkbox } from 'shared/ui/Checkbox';
import type { TemplateProps } from 'pages/Quiz/types/types.ts';
import { useTemplate } from 'pages/Quiz/lib/hooks/useTemplate.ts';

const MultipleSelectTemplate = (props: TemplateProps) => {
    const { question } = props;
    const { t } = useTranslation();

    const { onMultiSelect, isActive } = useTemplate(question);

    return (
        <>
            {question.answers.map((answer) => {
                const { translateKey, id } = answer;
                const active = isActive(id);

                return (
                    <Card
                        key={translateKey}
                        active={active}
                        className={classes.card}
                        cursorPointer
                        onClick={onMultiSelect(answer)}
                    >
                        <Typography variant="body1" fontSize={3} fontWeight="500">
                            {t(translateKey)}
                        </Typography>
                        <Checkbox checked={active} />
                    </Card>
                );
            })}
        </>
    );
};

export default MultipleSelectTemplate;
