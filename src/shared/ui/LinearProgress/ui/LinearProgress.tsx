import classes from './LinearProgress.module.scss';

interface LinearProgressProps {
    value: number;
    maxValue: number;
}

const LinearProgress = (props: LinearProgressProps) => {
    const { value = 1, maxValue = 10 } = props;

    const percentage = ((value > maxValue ? maxValue : value) / maxValue) * 100;

    return (
        <div className={classes.track}>
            <div
                className={classes.indicator}
                style={{ transform: `translateX(${percentage}%)`, transition: 'all 0.5s ease' }}
            ></div>
        </div>
    );
};

export default LinearProgress;
