import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </StrictMode>
);
