import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import AppRouter from './router'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import './styles/reset.css'
import './styles/variables.css'
import './styles/main.css'


const theme = createTheme({
  fontFamily: 'sans-serif',
  primaryColor: "blue"
})


const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false,
          retry: 1
      }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} withGlobalClasses>
      <Notifications />
        <QueryClientProvider client={queryClient}>
          <AppRouter/>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
)
