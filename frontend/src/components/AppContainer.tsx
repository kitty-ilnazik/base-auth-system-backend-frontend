import { AnimatePresence, motion } from 'framer-motion'

import AppRouter from '@/router/AppRouter'

const AppContainer = () => {
	return (
		<div className='min-h-screen transition-colors duration-700 bg-background'>
			<AnimatePresence mode='wait'>
				<motion.div
					key='main'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<AppRouter />
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default AppContainer
