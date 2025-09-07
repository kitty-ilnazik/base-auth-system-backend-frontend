import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { I18nProvider } from '@/providers/I18nProvider.tsx'
import { QueryProvider } from '@/providers/QueryProvider.tsx'
import { ThemeProvider } from '@/providers/ThemeProvider.tsx'

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<ThemeProvider>
				<I18nProvider>
					<App />
				</I18nProvider>
			</ThemeProvider>
		</QueryProvider>
	</StrictMode>
)
