import ReactDOM from 'react-dom/client';
import 'app/styles/index.scss';
import App from 'app/App.tsx';
import 'shared/config/i18';
import ProviderQueryClient from 'app/providers/ProviderQueryClient.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ProviderQueryClient>
        <App />
    </ProviderQueryClient>,
);
