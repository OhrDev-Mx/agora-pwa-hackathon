// pwa-final/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatorsPage from './pages/CreatorsPage.tsx';

import { WagmiProvider, createConfig, http } from "wagmi";
import { foundry } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from 'wagmi/connectors';

const queryClient = new QueryClient();
export const config = createConfig({
  chains: [foundry],
  connectors: [injected()],
  transports: { [foundry.id]: http() },
});

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'indigo',
});

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/creators", element: <CreatorsPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </MantineProvider>
  </React.StrictMode>,
);