import React, { createContext, useContext, useEffect, useState } from 'react'

import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

type LanguageCode = 'en' | 'ru'
type Translation = string | { [key: string]: Translation }

interface LanguageOption {
	code: LanguageCode
	name: string
	flag: string
}

interface I18nContextProps {
	lang: LanguageCode
	setLanguage: (lang: LanguageCode) => void
	t: (key: string) => string
	supported: LanguageOption[]
}

const LANG_HOOK_KEY = 'app-lang'
const DEFAULT_LANG: LanguageCode = 'en'

const SUPPORTED_LANGUAGES: Record<LanguageCode, LanguageOption> = {
	en: { code: 'en', name: 'English', flag: '🇬🇧' },
	ru: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
}

const translations: Record<LanguageCode, Translation> = {
	en,
	ru,
}

const I18nContext = createContext<I18nContextProps>({
	lang: DEFAULT_LANG,
	setLanguage: () => {},
	t: (key: string) => key,
	supported: Object.values(SUPPORTED_LANGUAGES),
})

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [lang, setLang] = useState<LanguageCode>(DEFAULT_LANG)

	const determineLanguage = (): LanguageCode => {
		const saved = localStorage.getItem(LANG_HOOK_KEY) as LanguageCode | null
		if (saved && SUPPORTED_LANGUAGES[saved]) return saved

		const systemLang = navigator.language.split('-')[0] as LanguageCode
		if (systemLang && SUPPORTED_LANGUAGES[systemLang]) return systemLang

		return DEFAULT_LANG
	}

	const setLanguage = (newLang: LanguageCode) => {
		setLang(newLang)
		localStorage.setItem(LANG_HOOK_KEY, newLang)
	}

	useEffect(() => {
		setLang(determineLanguage())

		const handleLanguageChange = () => {
			const systemLang = navigator.language.split('-')[0] as LanguageCode
			if (
				!localStorage.getItem(LANG_HOOK_KEY) &&
				SUPPORTED_LANGUAGES[systemLang]
			) {
				setLang(systemLang)
			}
		}

		window.addEventListener('languagechange', handleLanguageChange)

		return () => {
			window.removeEventListener('languagechange', handleLanguageChange)
		}
	}, [])

	const t = (key: string): string => {
		const keys = key.split('.')
		let result: any = translations[lang]

		for (const k of keys) {
			if (result[k] === undefined) return key
			result = result[k]
		}

		return result
	}

	return (
		<I18nContext.Provider
			value={{
				lang,
				setLanguage,
				t,
				supported: Object.values(SUPPORTED_LANGUAGES),
			}}
		>
			{children}
		</I18nContext.Provider>
	)
}

export const useI18n = () => useContext(I18nContext)
