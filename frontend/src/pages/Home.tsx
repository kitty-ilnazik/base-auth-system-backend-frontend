import { Button } from '@/components/ui/button'

import { LINKS } from '@/config/links'

import { useTranslations } from '@/hooks/I18n'

const Home = () => {
	const t = useTranslations('app.pages.home')
	const tCommon = useTranslations('app.common')

	return (
		<div className='flex flex-col items-center justify-center min-h-[80vh] space-y-8'>
			<h1 className='text-4xl font-bold text-center'>{t('title')}</h1>
			<p className='text-xl text-center text-muted-foreground max-w-2xl'>
				{t('description')}
			</p>
			<div className='flex gap-4'>
				<Button asChild size='lg'>
					<a href={LINKS.routes.auth} className='text-white'>
						{tCommon('signIn')}
					</a>
				</Button>
				<Button asChild variant='outline' size='lg'>
					<a href={LINKS.routes.profile}>{tCommon('Profile')}</a>
				</Button>
			</div>
		</div>
	)
}

export default Home
