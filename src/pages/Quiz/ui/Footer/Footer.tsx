import { useTranslation } from 'react-i18next';

import { useButtonDisabled } from 'pages/Quiz/lib/hooks/useDisabledButton.tsx';
import { Button } from 'shared/ui/Button';

interface FooterProps {
    onNext: () => void;
}

const Footer = (props: FooterProps) => {
    const { onNext } = props;
    const { t } = useTranslation();

    const isDisabled = useButtonDisabled((state) => state.isDisabled);

    return (
        <div>
            <Button type="button" disabled={isDisabled} className="w-full" onClick={onNext}>
                {t('next')}
            </Button>
        </div>
    );
};

export default Footer;
