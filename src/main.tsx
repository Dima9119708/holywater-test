import ReactDOM from 'react-dom/client';

import App from 'app/App.tsx';
import ProviderQueryClient from 'app/providers/ProviderQueryClient.tsx';
import 'app/styles/index.scss';
import 'shared/config/i18';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ProviderQueryClient>
        <App />
    </ProviderQueryClient>,
);
