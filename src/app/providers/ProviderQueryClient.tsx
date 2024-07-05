import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const queryClient = new QueryClient();

const ProviderQueryClient = (props: { children: React.ReactNode }) => {
    const { children } = props;

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ProviderQueryClient;
