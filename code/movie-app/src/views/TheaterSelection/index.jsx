import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import { useEffect, useState, useContext } from 'react'
import Spinner from '../../components/spinner'
import axios from 'axios'
import AppContext from '../../contexts/AppContext'
import config from './../../conf'

const TheaterSelectionView = () => {
	const navigate = useNavigate()
	const { selectedMovieInfo } = useContext(AppContext)
	const [theaterMovieTimeList, setTheaterMovieTimeList] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const handleShowTimeClick = (theater, showTime) => {
		navigate('/seat-selection')
	}

	useEffect(() => {
		const theaterPromise = new Promise((resolve, reject) => {
			axios
				.get(config.nodeServerURL + '/theaters')
				.then((res) => {
					if (res && res.data && res.data.theaters && res.data.theaters.length) {
						let theaterMap = {}

						res.data.theaters.map((theater) => {
							theaterMap[theater._id] = theater.name
						})
						resolve(theaterMap)
					} else {
						resolve({})
					}
				})
				.catch((e) => {
					reject([])
				})
		})

		const theaterMovieShowsPromise = new Promise((resolve, reject) => {
			axios
				.get(config.nodeServerURL + '/movie-theater-time')
				.then((res) => {
					if (res && res.data && res.data.movieTheaterShowList) {
						resolve(res.data.movieTheaterShowList)
						return
					}
					resolve([])
				})
				.catch(() => {
					reject([])
				})
		})

		Promise.all([theaterPromise, theaterMovieShowsPromise])
			.then((result) => {
				const _theaterList = result[0],
					_movieTheaterShowList = result[1]

				if (_movieTheaterShowList && _movieTheaterShowList.length) {
					let parsedMovieTheaterShowList = _movieTheaterShowList.map((movieTheater) => {
						return { ...movieTheater, theaterName: _theaterList[movieTheater.theaterId] }
					})
					setTheaterMovieTimeList(parsedMovieTheaterShowList)
				} else {
					setTheaterMovieTimeList([])
				}

				setIsLoading(false)
			})
			.catch((e) => {
				setTheaterMovieTimeList([])
				setIsLoading(false)
			})
	}, [])

	return (
		<div style={{ marginTop: 32 }}>
			<h3>Theater Selection</h3>
			<hr style={{ margin: '12px 0px 32px' }} />

			{isLoading ? (
				<Spinner size={'lg'} />
			) : (
				<>
					{' '}
					<div style={{ display: 'flex' }}>
						<div style={{ width: 320 }}>
							<div style={{ width: 280, height: 350, position: 'relative', marginBottom: 24 }}>
								<img src={'/img/movies/' + selectedMovieInfo.image} className='movie-image' />
							</div>
						</div>
						<div style={{ flex: 1 }}>
							<h4>{selectedMovieInfo.name}</h4>
							<p>{selectedMovieInfo.description}</p>
							<h4>Now Showing</h4>
							<ul style={{ listStyle: 'none' }}>
								{theaterMovieTimeList.map((theaterMovie) => {
									return (
										<li className='theater-list-item' key={theaterMovie._id}>
											<div style={{ marginBottom: 8, fontWeight: 'bold' }}>{theaterMovie.theaterName}</div>
											<div>
												{theaterMovie.showTimes.map((showTime) => {
													return (
														<span
															style={{ marginRight: 12, cursor: 'pointer' }}
															key={showTime}
															onClick={() => {
																handleShowTimeClick(theaterMovie, showTime)
															}}
														>
															<Button variant='outline-secondary'>{showTime}</Button>
														</span>
													)
												})}
											</div>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default TheaterSelectionView
