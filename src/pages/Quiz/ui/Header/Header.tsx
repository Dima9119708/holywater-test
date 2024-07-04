import IconBack from 'shared/assets/images/back.component.svg';
import classes from './Header.module.scss';
import { LinearProgress } from 'shared/ui/LinearProgress';
import { Typography } from 'shared/ui/Typography';

interface HeaderProps {
    onBack: () => void;
    isShowButtonBack: boolean;
    valueProgress: number;
    maxValueProgress: number;
}

const Header = (props: HeaderProps) => {
    const { onBack, isShowButtonBack, valueProgress, maxValueProgress } = props;

    return (
        <div>
            <div className={classes.progress_header}>
                {isShowButtonBack && <IconBack className={classes.back} onClick={onBack} />}
                <div className={classes.step_indicator}>
                    <Typography
                        variant="body1"
                        font="secondary"
                        fontWeight="800"
                        color="02"
                        fontSize={1}
                    >
                        {valueProgress}
                    </Typography>
                    <Typography variant="body1" font="secondary" fontWeight="800" fontSize={1}>
                        /
                    </Typography>
                    <Typography variant="body1" font="secondary" fontWeight="800" fontSize={1}>
                        {maxValueProgress}
                    </Typography>
                </div>
            </div>
            <LinearProgress value={valueProgress} maxValue={maxValueProgress + 1} />
        </div>
    );
};

export default Header;
