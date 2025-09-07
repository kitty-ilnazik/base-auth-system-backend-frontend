import { Button } from '@/components/ui/button'

import { useTranslations } from '@/hooks/I18n'

interface ServerErrorPageProps {
	errorCode?: number
}

const ServerErrorPage = ({ errorCode = 500 }: ServerErrorPageProps) => {
	const tErrors = useTranslations('errors.server')
	const tCommon = useTranslations('common.button')

	const getErrorDescription = () => {
		switch (errorCode) {
			case 401:
				return tErrors('descriptions.401')
			case 500:
				return tErrors('descriptions.500')
			case 502:
				return tErrors('descriptions.502')
			case 503:
				return tErrors('descriptions.503')
			case 504:
				return tErrors('descriptions.504')
			default:
				return tErrors('descriptions.default')
		}
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-foreground p-4 bg-background'>
			<div className='text-center max-w-md'>
				<h1 className='text-2xl font-semibold mb-4 text-primary'>
					{tErrors('title')}
				</h1>
				<p className='mb-6 text-foreground'>{getErrorDescription()}</p>
				<div className='flex flex-col sm:flex-row gap-3 items-center justify-center'>
					<Button
						onClick={() => window.location.reload()}
						className='h-9.5 transition-colors'
					>
						{tCommon('reloadPage')}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ServerErrorPage
