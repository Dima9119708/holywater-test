import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorQuiz = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/quiz/1');
    }, [navigate]);

    return null;
};

export default ErrorQuiz;
