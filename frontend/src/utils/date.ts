import { useI18n } from '@/providers/I18nProvider'

export const useFormattedDateTime = (dateString: string): string => {
	const { lang } = useI18n()

	const date = new Date(dateString)
	return date.toLocaleString(lang, {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})
}
