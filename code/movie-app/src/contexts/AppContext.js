import { createContext } from 'react'

export default createContext({
	userInfo: {},
	selectedMovieInfo: {},
	setUserInfo: () => {},
	setSelectedMovieInfo: () => {}
})
