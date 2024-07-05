import { createBrowserRouter, redirect } from 'react-router-dom';

import { RoutersPath } from 'shared/const/routers.ts';
import RootLayout from 'shared/layouts/RootLayout/ui/RootLayout.tsx';

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
                lazy: async () => {
                    const { Quiz, ErrorQuiz } = await import('pages/Quiz');

                    return {
                        Component: Quiz,
                        errorElement: <ErrorQuiz />,
                    };
                },
            },
            {
                path: RoutersPath.LOADER,
                lazy: async () => {
                    const { Loader } = await import('pages/Loader');
                    return { Component: Loader };
                },
            },
            {
                path: RoutersPath.EMAIL,
                lazy: async () => {
                    const { Email } = await import('pages/Email');
                    return { Component: Email };
                },
            },
            {
                path: RoutersPath.THANK_YOU,
                lazy: async () => {
                    const { ThankYou } = await import('pages/ThankYou');
                    return { Component: ThankYou };
                },
            },
        ],
    },
]);
