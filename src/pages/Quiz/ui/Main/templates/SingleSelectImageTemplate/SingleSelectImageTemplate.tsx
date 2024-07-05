import { useTranslation } from 'react-i18next';

import { useTemplate } from 'pages/Quiz/lib/hooks/useTemplate.ts';
import type { TemplateProps } from 'pages/Quiz/types/types.ts';
import { Card } from 'shared/ui/Card';
import { Typography } from 'shared/ui/Typography';

import classes from './SingleSelectImageTemplate.module.scss';

const SingleSelectImageTemplate = (props: TemplateProps) => {
    const { question } = props;
    const { t } = useTranslation();

    const { onSingleSelect, isActive } = useTemplate(question);

    return (
        <div className={classes.row}>
            {question.answers.map((answer) => {
                const { translateKey, img, id } = answer;
                const active = isActive(id);

                return (
                    <Card
                        key={translateKey}
                        active={active}
                        className={classes.card}
                        cursorPointer
                        onClick={onSingleSelect(answer)}
                    >
                        {img && <img className={classes.image} src={img} alt={t(translateKey)} />}
                        <Typography variant="body1" fontSize={3} fontWeight="500">
                            {t(translateKey)}
                        </Typography>
                    </Card>
                );
            })}
        </div>
    );
};

export default SingleSelectImageTemplate;
