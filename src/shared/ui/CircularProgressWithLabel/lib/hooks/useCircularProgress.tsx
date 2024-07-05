import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseCircularProgressIntervalProps {
    time: number;
    step: number;
    minValue?: number;
    maxValue?: number;
    onEndAnimation?: () => void;
}

export interface UseCircularProgressProps extends UseCircularProgressIntervalProps {
    time: number;
    step: number;
    minValue?: number;
    maxValue?: number;
    percent: number;
}

export const useCircularProgressInterval = (props: UseCircularProgressIntervalProps) => {
    const { time, step, minValue = 0, maxValue = 100, onEndAnimation } = props;

    const [percent, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => {
                return v >= maxValue ? maxValue : Math.ceil(v + maxValue / step);
            });
        }, time / step);

        const timeOut = setTimeout(
            () => {
                onEndAnimation && onEndAnimation();
            },
            time + time / step,
        );

        return () => {
            clearInterval(interval);
            clearTimeout(timeOut);
        };
    }, [time, step, maxValue, minValue]);

    return {
        ...props,
        percent,
    };
};

export const useCircularProgress = (props: UseCircularProgressProps) => {
    const { time, step, minValue = 0, maxValue = 100, percent } = props;

    const strokeWidth = 1.2;
    const center = 16;
    const radius = 16 - strokeWidth;
    const circumference = 2 * radius * Math.PI;
    const animateDuration = time / step / 1000;

    const clampPercentage = useCallback(
        (value: number, max: number) => {
            return value > max ? max : value < minValue ? minValue : value;
        },
        [minValue],
    );

    const percentage = useMemo(() => {
        return clampPercentage((percent - minValue) / (maxValue - minValue), 1);
    }, [clampPercentage, percent, minValue, maxValue]);

    const offset = circumference - percentage * circumference;

    const getSvgProps = useCallback(
        () => ({
            viewBox: '0 0 32 32',
            fill: 'none',
            strokeWidth,
        }),
        [strokeWidth],
    );

    const getTrackProps = useCallback(
        () => ({
            cx: center,
            cy: center,
            r: radius,
            role: 'presentation',
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: 0,
            transform: 'rotate(-90 16 16)',
            strokeLinecap: 'round',
            stroke: 'var(--color-03)',
        }),
        [circumference, radius],
    );

    const getIndicatorProps = useCallback(
        () => ({
            cx: center,
            cy: center,
            r: radius,
            role: 'presentation',
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset,
            transform: 'rotate(-90 16 16)',
            strokeLinecap: 'round',
            stroke: 'var(--color-02)',
            style: {
                transition: `all ${animateDuration}s ease`,
            },
        }),
        [offset, circumference, radius],
    );

    return {
        getSvgProps,
        getTrackProps,
        getIndicatorProps,
        percent: percent > maxValue ? maxValue : percent,
    };
};
