import axios from 'axios';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

export const logError = (message: string, error?: unknown, warn = false) => {
    let stringifiedError = '';
    if (error) {
        try {
            stringifiedError = JSON.stringify(error);
        } catch (e) {
            console.error(`helpers.ts logError JSON.stringify error while processing: ${message}`);
            return;
        }
    }

    console.info(`${message} ${stringifiedError}`);
    const logger = warn ? console.warn : console.error;
    logger(message);
};

const handleReactQueryError = (error: unknown, type: 'query' | 'mutation') => {
    if (axios.isAxiosError(error)) {
        const { url, method } = error.config || {};
        logError(`${type} error: ${method} ${url}`);
    } else {
        logError(`${type} error`, error);
    }
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 10,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => handleReactQueryError(error, 'query'),
    }),
    mutationCache: new MutationCache({
        onError: (error) => handleReactQueryError(error, 'mutation'),
    }),
});

const Setup: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
};

export default Setup;
