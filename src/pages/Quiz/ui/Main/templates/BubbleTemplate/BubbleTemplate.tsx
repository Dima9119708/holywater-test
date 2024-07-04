import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card';
import classes from './BubbleTemplate.module.scss';
import { Typography } from 'shared/ui/Typography';
import { TemplateProps } from 'pages/Quiz/types/types.ts';
import { useTemplate } from 'pages/Quiz/lib/hooks/useTemplate.ts';
import { useMemo } from 'react';
import { useSlide } from 'pages/Quiz/lib/hooks/useSlide.ts';

const BubbleTemplate = (props: TemplateProps) => {
    const { question } = props;
    const { t } = useTranslation();

    const { onMultiSelect, isActive } = useTemplate(question);

    const { onTouchMove, onTouchStart, moveRef, onPointerMove, onPointerDown, wrapRef } =
        useSlide();

    const chunkedArray = useMemo(() => {
        const result = [];
        for (let i = 0; i < question.answers.length; i += 2) {
            result.push(question.answers.slice(i, i + 2));
        }
        return result;
    }, [question.answers]);

    return (
        <div className={classes.slide_container}>
            <div
                ref={wrapRef}
                className={classes.slide_wrapper}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
            >
                <div ref={moveRef} className={classes.slide_inner}>
                    {chunkedArray.map((chunk, idx) => {
                        return (
                            <div key={idx}>
                                {chunk.map((answer) => {
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
                                            <Typography
                                                variant="body1"
                                                fontSize={6}
                                                fontWeight="600"
                                            >
                                                {t(translateKey)}
                                            </Typography>
                                        </Card>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BubbleTemplate;
