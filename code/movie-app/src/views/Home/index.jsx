import { useContext, useEffect } from 'react'
import { useState } from 'react'
import Spinner from './../../components/spinner'
import { useNavigate } from 'react-router-dom'

import AppContext from '../../contexts/AppContext'
import axios from 'axios'
import config from './../../conf'

const HomeView = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [movieList, setMovieList] = useState([])
	const { setSelectedMovieInfo } = useContext(AppContext)

	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get(config.nodeServerURL + '/movies')
			.then((res) => {
				if (res && res.data && res.data.movies) {
					setMovieList(res.data.movies)
				}

				setIsLoading(false)
			})
			.catch(() => {
				setMovieList([])
				setIsLoading(false)
			})
	}, [])

	const handleMovieCardClick = (movie) => {
		setSelectedMovieInfo(movie)
		navigate('/theater-selection')
	}

	return (
		<div className='home-view' style={{ marginTop: 32, minHeight: 400 }}>
			{isLoading ? (
				<Spinner size={'md'} />
			) : (
				<div>
					<label className='h3'>Movies</label>
					{movieList.length ? (
						<ul className='row movie-list-wrap'>
							{movieList.map((movie) => {
								return (
									<li className='col-3' key={movie._id}>
										<div
											className='movie-card'
											onClick={(e) => {
												handleMovieCardClick(movie)
											}}
										>
											<img src={'/img/movies/' + movie.image} className='movie-image' />
											<div className='movie-info'>
												<div className='info' style={{ paddingTop: 16 }}>
													<span style={{ fontWeight: 'bold' }}>{movie.name}</span>
													<span style={{ float: 'right', fontWeight: 'bold' }}>{movie.rating}</span>
												</div>
											</div>
										</div>
									</li>
								)
							})}
						</ul>
					) : (
						<div>No Movies Found</div>
					)}
				</div>
			)}
		</div>
	)
}

export default HomeView
