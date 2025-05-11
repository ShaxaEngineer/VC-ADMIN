import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/app';
import { StoreProvider } from '@/providers';
import '@/styles/ant.css';
import '@/styles/index.css';
import '@/styles/my-styles.css';

import './i18n';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
