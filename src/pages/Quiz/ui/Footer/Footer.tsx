import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { useButtonDisabled } from 'pages/Quiz/lib/hooks/useDisabledButton.tsx';
import { useEffect } from 'react';

interface FooterProps {
    onNext: () => void;
}

const Footer = (props: FooterProps) => {
    const { onNext } = props;
    const { t } = useTranslation();

    const isDisabled = useButtonDisabled((state) => state.isDisabled);

    useEffect(() => {
        useButtonDisabled.setState({ isNext: false });
    }, []);

    const onClick = () => {
        useButtonDisabled.setState({ isNext: true });
        onNext();
    };

    return (
        <div>
            <Button disabled={isDisabled} className="w-full" onClick={onClick}>
                {t('next')}
            </Button>
        </div>
    );
};

export default Footer;
