import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextProps {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const THEME_HOOK_KEY = 'app-theme'
const DEFAULT_THEME: Theme = 'system'
const DARK_CLASS = 'dark'

const ThemeContext = createContext<ThemeContextProps>({
	theme: DEFAULT_THEME,
	setTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)

	const getSystemTheme = (): Exclude<Theme, 'system'> =>
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'

	const determineTheme = (): Theme => {
		const savedTheme = localStorage.getItem(THEME_HOOK_KEY) as Theme | null
		if (
			savedTheme === 'light' ||
			savedTheme === 'dark' ||
			savedTheme === 'system'
		) {
			return savedTheme
		}

		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			return 'dark'
		}

		return DEFAULT_THEME
	}

	const applyTheme = (theme: Theme) => {
		const effectiveTheme = theme === 'system' ? getSystemTheme() : theme
		const html = document.documentElement

		if (effectiveTheme === 'dark') {
			html.classList.add(DARK_CLASS)
		} else {
			html.classList.remove(DARK_CLASS)
		}
	}

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme)
		localStorage.setItem(THEME_HOOK_KEY, newTheme)
		applyTheme(newTheme)
	}

	useEffect(() => {
		const initialTheme = determineTheme()
		setThemeState(initialTheme)
		applyTheme(initialTheme)

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handler = () => {
			const savedTheme = localStorage.getItem(THEME_HOOK_KEY) as Theme | null
			if (savedTheme === 'system' || !savedTheme) {
				applyTheme('system')
				setThemeState('system')
			}
		}

		mediaQuery.addEventListener('change', handler)

		return () => mediaQuery.removeEventListener('change', handler)
	}, [])

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => useContext(ThemeContext)
