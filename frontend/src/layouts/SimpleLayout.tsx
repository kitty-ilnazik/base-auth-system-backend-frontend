import { Outlet } from 'react-router-dom'

const SimpleLayout = () => {
	return (
		<div>
			<main>
				<Outlet />
			</main>
		</div>
	)
}

export default SimpleLayout
