import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ErrorQuiz = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/quiz/1');
    }, []);

    return null;
};

export default ErrorQuiz;
