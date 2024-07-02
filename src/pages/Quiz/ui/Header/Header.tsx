import IconBack from 'shared/assets/images/back.component.svg';
import classes from './Header.module.scss';
import { LinearProgress } from 'shared/ui/LinearProgress';
import { Typography } from 'shared/ui/Typography';

interface HeaderProps {
    onBack: () => void;
    isShowBack: boolean;
    value: number;
    maxValue: number;
}

const Header = (props: HeaderProps) => {
    const { onBack, isShowBack, value, maxValue } = props;

    return (
        <div>
            <div className={classes.progress_header}>
                {isShowBack && <IconBack className={classes.back} onClick={onBack} />}
                <div className={classes.step_indicator}>
                    <Typography
                        variant="body1"
                        font="secondary"
                        fontWeight="800"
                        color="02"
                        fontSize={1}
                    >
                        {value}
                    </Typography>
                    <Typography variant="body1" font="secondary" fontWeight="800" fontSize={1}>
                        /
                    </Typography>
                    <Typography variant="body1" font="secondary" fontWeight="800" fontSize={1}>
                        {maxValue}
                    </Typography>
                </div>
            </div>
            <LinearProgress value={value} maxValue={maxValue + 1} />
        </div>
    );
};

export default Header;
