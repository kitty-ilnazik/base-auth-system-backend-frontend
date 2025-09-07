import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useI18n } from '@/providers/I18nProvider'

const LanguageSwitcher: React.FC = () => {
	const { lang, setLanguage, supported: supportedLanguages } = useI18n()
	const currentLanguage = supportedLanguages.find(l => l.code === lang)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='sm'>
					<span className='text-lg'>{currentLanguage?.flag}</span>
					<span className='text-sm hidden lg:inline'>
						{currentLanguage?.name}
					</span>
					<ChevronDown className='w-4 h-4 hidden lg:inline' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='border bg-background/60 backdrop-blur-lg shadow-xl w-40'
			>
				{supportedLanguages.map(lang => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => setLanguage(lang.code)}
						className='gap-2'
					>
						<span className='text-lg'>{lang.flag}</span>
						<span>{lang.name}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LanguageSwitcher
