import classes from './CircularProgressWithLabel.module.scss';
import type { UseCircularProgressProps } from '../lib/hooks/useCircularProgress.tsx';
import { useCircularProgress } from '../lib/hooks/useCircularProgress.tsx';

interface CircularProgressWithLabelProps extends UseCircularProgressProps {}

const CircularProgressWithLabel = (props: CircularProgressWithLabelProps) => {
    const { getTrackProps, getSvgProps, getIndicatorProps, percent } = useCircularProgress(props);

    return (
        <div style={{ width: '252px', height: '252px' }} className={classes.root}>
            <div className={classes.span}>
                <svg {...getSvgProps()}>
                    <circle {...getTrackProps()} />
                    <circle {...getIndicatorProps()} />
                </svg>
            </div>

            <div className={classes.label}>{percent}%</div>
        </div>
    );
};

export default CircularProgressWithLabel;
