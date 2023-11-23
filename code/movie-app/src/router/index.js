import React from 'react'

import { Routes, Route } from 'react-router-dom'

const AuthView = React.lazy(() => import('../views/Auth'))
const AboutView = React.lazy(() => import('../views/About'))
const HomeView = React.lazy(() => import('../views/Home'))
const TheaterSelectionView = React.lazy(() => import('../views/TheaterSelection'))
const SeatSelectionView = React.lazy(() => import('../views/SeatSelection'))
const TicketView = React.lazy(() => import('../views/Ticket'))
const NotFoundView = React.lazy(() => import('../views/NotFound'))

const AppLayout = React.lazy(() => import('../layouts/AppLayout'))

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<AppLayout />}>
				<Route index element={<HomeView />} />
				<Route path='/auth' element={<AuthView />} />
				<Route path='/home' element={<HomeView />} />
				<Route path='/theater-selection' element={<TheaterSelectionView />} />
				<Route path='/seat-selection' element={<SeatSelectionView />} />
				<Route path='/ticket' element={<TicketView />} />
				<Route path='/about' element={<AboutView />} />
				<Route path='*' element={<NotFoundView />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
