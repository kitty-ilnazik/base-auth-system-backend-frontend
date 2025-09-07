import { LogIn, User } from 'lucide-react'

import { useLocation } from 'react-router-dom'

import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher'
import { Button } from '@/components/ui/button'

import { LINKS } from '@/config/links'

import { useTranslations } from '@/hooks/I18n'
import LanguageSwitcher from './switchers/LanguageSwitcher'

const Header: React.FC = () => {
	const t = useTranslations('app.common')
	const { pathname } = useLocation()

	return (
		<header className='bg-background/80 backdrop-blur-md border-b'>
			<div className='container mx-auto px-4 py-3 flex justify-between items-center'>
				<a href={LINKS.routes.home} className='text-xl font-bold text-primary'>
					Base Auth System
				</a>
				<div className='flex items-center gap-4'>
					<ThemeSwitcher />
					<LanguageSwitcher />

					{pathname !== LINKS.routes.auth && (
						<Button asChild variant='ghost' size='sm'>
							<a href={LINKS.routes.auth}>
								<LogIn className='mr-2 h-4 w-4' />
								{t('signIn')}
							</a>
						</Button>
					)}

					{pathname !== LINKS.routes.profile &&
						pathname !== LINKS.routes.auth && (
							<Button asChild variant='ghost' size='sm'>
								<a href={LINKS.routes.profile}>
									<User className='mr-2 h-4 w-4' />
									{t('Profile')}
								</a>
							</Button>
						)}
				</div>
			</div>
		</header>
	)
}

export default Header
