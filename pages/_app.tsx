import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Provider as JotaiProvider } from "jotai"
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <ThemeProvider attribute='class'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </JotaiProvider>
  )
}
