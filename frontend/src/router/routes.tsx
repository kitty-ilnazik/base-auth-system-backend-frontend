import NotFound from '@/pages/errors/NotFound'
import Home from '@/pages/Home'

import MainLayout from '@/layouts/MainLayout'
import SimpleLayout from '@/layouts/SimpleLayout'

import { LINKS } from '@/config/links'

export const routes = () => [
	{
		path: LINKS.routes.home,
		element: <MainLayout />,
		children: [{ index: true, element: <Home /> }],
	},
	{
		path: LINKS.routes.home,
		element: <SimpleLayout />,
		children: [],
	},
	{ path: '*', element: <NotFound /> },
]
