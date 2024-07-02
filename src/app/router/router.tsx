import { createBrowserRouter, redirect } from 'react-router-dom';
import RootLayout from 'shared/layouts/RootLayout/ui/RootLayout.tsx';
import { ErrorQuiz, Quiz } from 'pages/Quiz';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        loader: (args) => {
            if (!args.request.url.includes('quiz')) {
                return redirect('/quiz/1');
            }

            return null;
        },
        children: [
            {
                index: true,
                path: 'quiz/:id',
                element: <Quiz />,
                errorElement: <ErrorQuiz />,
            },
        ],
    },
]);
