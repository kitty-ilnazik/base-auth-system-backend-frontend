import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { LINKS } from '@/config/links'
import { useTranslations } from '@/hooks/I18n'

const NotFound = () => {
	const t = useTranslations('errors.notFound')
	const tCommon = useTranslations('common.button')

	const navigate = useNavigate()
	const canGoBack = window.history.state?.idx > 0

	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-foreground'>
			<div className='text-center max-w-md'>
				<h1 className='text-9xl font-bold text-gray-400 mb-4 dark:text-gray-600'>
					404
				</h1>
				<h2 className='text-2xl font-semibold mb-2'>{t('title')}</h2>
				<p className='mb-6 text-foreground'>{t('description')}</p>

				<div className='flex flex-col sm:flex-row gap-3 justify-center'>
					<Button
						onClick={() => navigate(LINKS.routes.home)}
						className='h-9.5 transition-colors'
					>
						{tCommon('goHome')}
					</Button>

					{canGoBack && (
						<Button
							variant='secondary'
							onClick={() => navigate(-1)}
							className='h-9.5 transition-colors'
						>
							{tCommon('goBack')}
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default NotFound
