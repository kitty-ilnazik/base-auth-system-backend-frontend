import { Laptop, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useTranslations } from '@/hooks/I18n'

import { useTheme } from '@/providers/ThemeProvider'

export const ThemeSwitcher: React.FC = () => {
	const { theme, setTheme } = useTheme()
	const t = useTranslations('app.themes')

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					{theme === 'light' ? (
						<Sun className='h-5 w-5' />
					) : theme === 'dark' ? (
						<Moon className='h-5 w-5' />
					) : (
						<Laptop className='h-5 w-5' />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='border bg-background/60 backdrop-blur-lg shadow-xl'
			>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					<Sun className='mr-2 h-4 w-4' />
					<span>{t('light')}</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					<Moon className='mr-2 h-4 w-4' />
					<span>{t('dark')}</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					<Laptop className='mr-2 h-4 w-4' />
					<span>{t('system')}</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
