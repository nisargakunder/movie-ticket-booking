import React, { Suspense, useState } from 'react'
import './styles/App.css'
import { Button } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router'

import AppContext from './contexts/AppContext'
function App() {
	const _storedUserInfo = sessionStorage.getItem('userInfo')
	const _storedSelectedMovieInfo = sessionStorage.getItem('selectedMovieInfo')

	const [userInfo, setUserInfo] = useState(_storedUserInfo ? JSON.parse(_storedUserInfo) : null)
	const [selectedMovieInfo, setSelectedMovieInfo] = useState(_storedSelectedMovieInfo ? JSON.parse(_storedSelectedMovieInfo) : null)

	const handleSetUserInfo = (_userInfo) => {
		sessionStorage.setItem('userInfo', JSON.stringify(_userInfo))
		setUserInfo(_userInfo)
	}

	const handleSetSelectedMovieInfo = (_selectedMovieInfo) => {
		sessionStorage.setItem('selectedMovieInfo', JSON.stringify(_selectedMovieInfo))
		setSelectedMovieInfo(_selectedMovieInfo)
	}

	const contextValue = {
		userInfo: userInfo,
		selectedMovieInfo: selectedMovieInfo,
		setUserInfo: handleSetUserInfo,
		setSelectedMovieInfo: handleSetSelectedMovieInfo
	}
	return (
		<div className='app'>
			<AppContext.Provider value={contextValue}>
				<Suspense fallback={<div></div>}>
					<BrowserRouter>
						<AppRouter />
					</BrowserRouter>
				</Suspense>
			</AppContext.Provider>
		</div>
	)
}

export default App
