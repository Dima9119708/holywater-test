import { createBrowserRouter, redirect } from 'react-router-dom';
import RootLayout from 'shared/layouts/RootLayout/ui/RootLayout.tsx';
import { ErrorQuiz, Quiz } from 'pages/Quiz';
import { Loader } from 'pages/Loader';
import { Email } from 'pages/Email';
import { ThankYou } from 'pages/ThankYou';
import { RoutersPath } from 'shared/const/routers.ts';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        loader: async (args) => {
            if (new URL(args.request.url).pathname === '/') {
                return redirect(RoutersPath.START_QUIZ);
            }

            return null;
        },
        children: [
            {
                index: true,
                path: `${RoutersPath.QUIZ}:id`,
                element: <Quiz />,
                errorElement: <ErrorQuiz />,
            },
            {
                path: RoutersPath.LOADER,
                element: <Loader />,
            },
            {
                path: RoutersPath.EMAIL,
                element: <Email />,
            },
            {
                path: RoutersPath.THANK_YOU,
                element: <ThankYou />,
            },
        ],
    },
]);
